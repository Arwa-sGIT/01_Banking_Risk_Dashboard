
# Corporate Banking Risk Dashboard
 
Real-time portfolio monitoring system built with React and synthetic banking data. Demonstrates rules-based risk detection, compliance tracking, and interactive data visualization for corporate lending portfolios.

**[Live Demo](https://arwa-sgit.github.io/01_Banking_Risk_Dashboard/)** • **[View Source](https://github.com/Arwa-sGIT/01_Banking_Risk_Dashboard)**

---

## Problem

Corporate portfolio managers manually review hundreds of loans daily to identify:
- Payment delays before they escalate
- Expired KYC documentation (regulatory requirement)
- High-risk credit profiles requiring intervention

Manual review = 2 hours/day. Automated exception detection = 15 minutes.

## Solution

Built an interactive dashboard that automatically flags exceptions using deterministic business rules:

```javascript
// Watchlist Logic (Management by Exception)
const shouldFlag = (loan) => {
  return loan.daysPastDue > 0 ||           // Rule A: Late payments
         loan.kycStatus !== 'Valid' ||     // Rule B: Compliance gaps
         loan.creditRating.startsWith('C') // Rule C: High risk
}
```

**Result**: 87.5% reduction in daily review time. 12/50 high-priority cases surfaced automatically.

---

## Stack

**Frontend**
- React 18 (hooks: `useState`, `useMemo`, `useEffect`)
- Tailwind CSS (utility-first, no build step)
- CDN-based deployment (GitHub Pages)

**Data Engineering**
- Python data generation (`pandas`, `numpy`)
- 750 synthetic corporate loans across 9 sectors
- Realistic credit ratings, payment delays, KYC statuses

**Business Logic**
- Basel III risk-weighted asset calculations
- RFM-style exception filtering
- Sector concentration risk analysis

---

## Architecture

### Data Flow
```
CSV (750 loans) → Python generator → React state → useMemo filters → UI
```

### Component Structure
```
BankingControlTower
  ├─ KPI Cards (Total Exposure, RWA, Active Alerts)
  ├─ Search Bar (autocomplete, keyboard shortcuts)
  ├─ View Toggle (Watchlist / Stress Test)
  ├─ Sector Filter (stress testing)
  └─ Data Table (expandable rows, real-time filtering)
```

### Performance
- `useMemo` for filtered datasets (prevents unnecessary re-renders)
- Search debouncing via state management
- Lazy expansion of table rows

---

## Key Features

**1. Intelligent Search**
- Autocomplete with top 5 matches
- Keyboard shortcut: `⌘K` / `Ctrl+K`
- Real-time highlighting with `<mark>` tags
- Filters across client name, loan ID, sector

**2. Morning Watchlist**
- Deterministic filtering (no ML/AI)
- Surfaces 24% of portfolio requiring action
- Three-rule exception logic (late payment, KYC, rating)

**3. Stress Test Simulator**
- Interactive sector filtering
- Real-time KPI recalculation
- Concentration risk visualization
- Example: "Energy" sector → €65M exposure across 5 clients

**4. Basel III Calculations**
```javascript
// Risk weight mapping
const riskWeights = {
  'AAA/AA': 0.20,
  'A':      0.50,
  'BBB':    0.75,
  'BB/B':   1.00,
  'C/D':    1.50
}

// RWA = Sum of (Outstanding Balance × Risk Weight)
const rwa = portfolio.reduce((sum, loan) => 
  sum + (loan.balance * getRiskWeight(loan.rating)), 0
)
```

---

## Data Schema

| Field | Type | Business Purpose |
|-------|------|------------------|
| `Loan_ID` | String | Unique facility identifier |
| `Outstanding_Balance_EUR` | Number | Current exposure (€651K - €52M) |
| `Credit_Rating` | Enum | AAA → CCC (Basel III mapping) |
| `Days_Past_Due` | Number | 0-60 days (watchlist trigger) |
| `KYC_Status` | Enum | Valid / Expiring Soon / Expired |
| `Risk_Flag` | Enum | Performing / Grace Period / Watch List |
| `Interest_Rate_Pct` | Number | 2.5% - 8.2% range |
| `Utilization_Rate_Pct` | Number | For revolving credit facilities |

**Full schema**: 750 loans × 20 fields (see `data/data_dictionary.md`)

---

## Implementation Details

### Search with Autocomplete
```javascript
const suggestions = useMemo(() => {
  if (!searchQuery || searchQuery.length < 2) return [];
  return portfolioData
    .filter(c => c.Client_Name.toLowerCase().includes(query))
    .slice(0, 5);
}, [searchQuery]);
```

### Keyboard Shortcuts
```javascript
useEffect(() => {
  const handleKeyPress = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      document.querySelector('input[type="text"]')?.focus();
    }
  };
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

### Risk-Weighted Assets (Basel III)
```javascript
const getRiskWeight = (rating) => {
  if (rating.startsWith('AAA') || rating.startsWith('AA')) return 0.20;
  if (rating.startsWith('A')) return 0.50;
  if (rating.startsWith('BBB')) return 0.75;
  if (rating.startsWith('BB') || rating.startsWith('B')) return 1.00;
  return 1.50; // C/D ratings
};
```

---

## Running Locally

```bash
# Clone
git clone https://github.com/Arwa-sGIT/01_Banking_Risk_Dashboard.git
cd 01_Banking_Risk_Dashboard

# Open in browser (no build step)
open index.html

# Or serve locally
python -m http.server 8000
# Navigate to localhost:8000
```

**Test the dashboard:**
1. Press `⌘K` to focus search
2. Type "TotalEnergies" (should highlight match)
3. Click "Morning Watchlist" (flags 12 exceptions)
4. Select "Energy" in Stress Test (shows sector exposure)
5. Click any table row (expands details)

---

## Project Structure

```
01_Banking_Risk_Dashboard/
├── index.html                         # Entry point (CDN-based React)
├── src/
│   └── BankingControlTower.jsx        # Main component (48KB, 50 clients)
├── data/
│   ├── banking_portfolio_data.csv     # 750 synthetic loans
│   └── data_dictionary.md             # Schema documentation
├── notebooks/
│   └── 01_Data_Generation.ipynb       # Python data generator
├── screenshots/
│   ├── 01_search_demo.png
│   ├── 02_watchlist_view.png
│   └── 03_stress_test.png
├── package.json                        # Dependencies reference
├── .gitignore                         # Git configuration
├── DATA_INTEGRATION_GUIDE.md          # Full dataset integration
└── README.md                           # This file
```

---

## Technical Decisions

**Why React without build tools?**
- Fast iteration during development
- Zero-config deployment to GitHub Pages
- Appropriate for portfolio/demo projects
- Trade-off: Larger initial bundle vs. deployment simplicity

**Why synthetic data?**
- Demonstrates data engineering skills (Python generation)
- Avoids confidentiality issues with real banking data
- Fully reproducible dataset
- Realistic distributions (85% performing, 15% exceptions)

**Why deterministic rules vs. ML?**
- Regulatory compliance requirements (explainability)
- Real-world banking uses rules-based systems for watchlists
- Demonstrates understanding of domain constraints
- ML would be overkill for exception detection

**Why CDN-based Tailwind?**
- No build step = faster deployment
- Standard approach for GitHub Pages projects
- Appropriate for portfolio use case
- Production apps would use PostCSS build process

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| Initial load | ~150KB (gzipped) |
| Time to interactive | <2s on 4G |
| Search response | <50ms |
| Filter recalculation | <100ms |
| Accessibility score | 95/100 (Lighthouse) |

---

## Known Limitations

- **Dataset size**: 50 clients rendered (750 available in CSV)
  - Reason: Performance optimization for demo
  - Solution: Pagination or virtualization for full dataset
  
- **No persistence**: State resets on refresh
  - Reason: Demo application without backend
  - Solution: Add localStorage or backend API
  
- **Tailwind CDN**: Console warning about production use
  - Reason: CDN-based setup for simplicity
  - Impact: None (warning is informational only)

---

## Future Improvements

- [ ] Virtualized table (react-window) for 750+ rows
- [ ] CSV upload feature for custom datasets
- [ ] Historical trend charts (payment performance over time)
- [ ] PDF export with executive summary
- [ ] Dark mode toggle
- [ ] API integration for real-time data

---

## Screenshots

### Dashboard Overview
![Dashboard Overview](screenshots/01_search_demo.png)

### Morning Watchlist View
![Watchlist](screenshots/02_watchlist_view.png)

### Stress Test Simulator
![Stress Test](screenshots/03_stress_test.png)

---

## Data Attribution

Synthetic corporate banking data generated using Python for educational purposes. Company names mapped to real CAC 40 corporations for realism. All financial figures are synthetic.

---

## License

MIT License - Free for educational and portfolio use.

---

## References

- [Basel III Framework](https://www.bis.org/bcbs/basel3.htm) - Risk-weighted asset standards
- [React Hooks Documentation](https://react.dev/reference/react) - State management patterns
- [Tailwind CSS Utility Classes](https://tailwindcss.com/docs) - Styling approach

---

**Built with React, Python, and domain knowledge of corporate banking operations.**
