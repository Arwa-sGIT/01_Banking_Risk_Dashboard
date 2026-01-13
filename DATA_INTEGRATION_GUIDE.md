# Data Integration Guide

## Using Your Real Banking Portfolio Data

This guide explains how the dashboard was adapted to use your real `banking_portfolio_data.csv` file (750 corporate loans).

## Current Implementation

### What's Included
The React component (`BankingControlTower_RealData.jsx`) currently displays **50 corporate clients** sampled from your dataset. This is optimized for:
- ✅ Fast page load times
- ✅ Smooth interactions
- ✅ Demo/presentation purposes
- ✅ GitHub portfolio showcase

### Sample Data Highlights
**Companies included**: TotalEnergies, Sanofi, Michelin, Capgemini, Engie, Société Générale, Safran, and 43 more

**Sectors represented**: Real Estate, Energy, Manufacturing, Healthcare, Technology, Transportation, Retail, Financial Services

## Expanding to Full Dataset (750 Loans)

### Option 1: Direct Array Expansion (Simple)

Replace the `portfolioData` array in the component with all 750 rows:

```javascript
// Step 1: Install CSV parser
npm install papaparse

// Step 2: Import in component
import Papa from 'papaparse';
import bankingData from './data/banking_portfolio_data.csv';

// Step 3: Parse CSV
const [portfolioData, setPortfolioData] = useState([]);

useEffect(() => {
  Papa.parse(bankingData, {
    header: true,
    download: true,
    complete: (results) => {
      const mapped = results.data.map(row => ({
        Loan_ID: row.Loan_ID,
        Client_Name: mapClientName(row.Client_ID, row.Sector),
        Sector: row.Sector,
        Region: row.Region,
        Credit_Rating: row.Credit_Rating,
        Days_Past_Due: parseInt(row.Days_Past_Due),
        Risk_Flag: row.Risk_Flag,
        KYC_Status: row.KYC_Status,
        Outstanding_Balance: parseFloat(row.Outstanding_Balance_EUR),
        Utilization_Pct: parseFloat(row.Utilization_Rate_Pct),
        Last_Review: row.KYC_Last_Review_Date,
        Interest_Rate: parseFloat(row.Interest_Rate_Pct),
        Products_Used: row.Products_Used,
        Cross_Sell_Score: parseInt(row.Cross_Sell_Score)
      }));
      setPortfolioData(mapped);
    }
  });
}, []);
```

### Option 2: Client Name Mapping Function

To maintain realistic French company names for all 750 clients:

```javascript
const mapClientName = (clientID, sector) => {
  // Extract client number from ID (e.g., "CORP0274" -> 274)
  const num = parseInt(clientID.replace('CORP', ''));
  
  // Sector-specific company name pools
  const companies = {
    'Energy': [
      'TotalEnergies SE', 'Engie SA', 'EDF Renewables', 'Air Liquide SA',
      'Voltalia SA', 'Neoen SA', 'Rubis Énergie', 'Nexans SA'
    ],
    'Manufacturing': [
      'Safran SA', 'Michelin SCA', 'Saint-Gobain', 'Schneider Electric',
      'Plastic Omnium', 'Faurecia SE', 'Valeo SA', 'Arkema SA', 'Alstom SA'
    ],
    'Healthcare': [
      'Sanofi SA', 'Ipsen Pharma', 'bioMérieux SA', 'Servier Pharma',
      'Biogaran SA', 'Pierre Fabre'
    ],
    'Real Estate': [
      'Vinci Immobilier', 'Bouygues Immobilier', 'Nexity Group', 'Gecina SA',
      'Altarea Cogedim', 'Eiffage Construction', 'Kaufman & Broad',
      'Icade SA', 'Unibail-Rodamco', 'Covivio SA', 'Klépierre SA', 'Mercialys SA'
    ],
    'Technology': [
      'Dassault Systèmes', 'Capgemini SE', 'Atos SE', 'Thales Group', 'Worldline'
    ],
    'Retail': [
      'Carrefour SA', 'Auchan Retail', 'Casino Guichard', 'E.Leclerc',
      'Fnac Darty', 'Monoprix SA'
    ],
    'Transportation': [
      'SNCF Logistics', 'Geodis SA', 'Keolis Group', 'CMA CGM Group'
    ],
    'Financial Services': [
      'Société Générale', 'BNP Paribas', 'Crédit Agricole', 'Natixis'
    ]
  };
  
  // Return company name based on sector
  const sectorPool = companies[sector] || ['Generic Corp'];
  const index = num % sectorPool.length;
  return sectorPool[index] + ` (${clientID})`;
};
```

### Option 3: Performance Optimization (Recommended for 750+ rows)

For large datasets, implement virtualization:

```bash
npm install react-window
```

```javascript
import { FixedSizeList } from 'react-window';

// Replace table with virtualized list
<FixedSizeList
  height={600}
  itemCount={filteredData.length}
  itemSize={60}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      {/* Render table row */}
    </div>
  )}
</FixedSizeList>
```

## Data Dictionary Reference

Your CSV has these columns (from `data_dictionary.md`):

| Column | Type | Description | Usage in Dashboard |
|--------|------|-------------|-------------------|
| `Loan_ID` | String | Unique identifier | Primary key, searchable |
| `Client_ID` | String | Client identifier | Mapped to company name |
| `Loan_Amount_EUR` | Number | Original loan | Not displayed (can add) |
| `Outstanding_Balance_EUR` | Number | Current balance | Main exposure metric |
| `Utilization_Rate_Pct` | Number | % of limit used | Utilization bars |
| `Interest_Rate_Pct` | Number | Interest rate | Expandable row detail |
| `Sector` | String | Industry | Stress test filter |
| `Region` | String | French region | Geographic context |
| `Credit_Rating` | String | Rating (AAA-CCC) | Risk scoring |
| `Days_Past_Due` | Number | Payment delay | Watchlist trigger |
| `Risk_Flag` | String | Risk status | Status badges |
| `KYC_Status` | String | Compliance | Watchlist trigger |
| `Products_Used` | String | Banking products | Cross-sell analysis |
| `Cross_Sell_Score` | Number | Opportunity score | AI insights |

## Adding More Columns

Want to display additional fields? Add them to the component:

```javascript
// 1. Add to data mapping
Relationship_Manager: row.Relationship_Manager,
Loan_Type: row.Loan_Type,
Maturity_Date: row.Maturity_Date,

// 2. Add table column
<th>Relationship Manager</th>

// 3. Add table cell
<td>{client.Relationship_Manager}</td>

// 4. Add to expandable row
<div className="flex justify-between">
  <span>Loan Type</span>
  <span>{client.Loan_Type}</span>
</div>
```

## Performance Considerations

| Dataset Size | Recommendation |
|--------------|----------------|
| **< 100 rows** | Direct rendering (current approach) |
| **100-500 rows** | Add pagination (10-20 per page) |
| **500+ rows** | Use react-window virtualization |
| **1000+ rows** | Consider backend API with server-side filtering |

## Testing with Full Dataset

1. Update `portfolioData` array with all 750 rows
2. Test search performance: `"Energy"` should return ~150 results instantly
3. Test Stress Test view: Click "Real Estate" to see ~220 facilities
4. Verify KPI calculations: Total exposure should be ~€15B+ across all facilities

## Common Issues

### Issue: Page loads slowly
**Solution**: Implement pagination or virtualization

### Issue: Search is slow
**Solution**: Already optimized with `useMemo`, but consider debouncing:
```javascript
const [debouncedQuery] = useDebounce(searchQuery, 300);
```

### Issue: Client names are repetitive
**Solution**: Expand the company name pool in `mapClientName()` function

## Sample CSV to JSON Conversion

If you prefer JSON format:

```javascript
// Convert CSV to JSON
const convertToJSON = () => {
  Papa.parse(csvFile, {
    header: true,
    complete: (results) => {
      const json = JSON.stringify(results.data, null, 2);
      // Save to portfolioData.json
    }
  });
};
```

## Support

For questions about data integration:
1. Check the data structure in `banking_portfolio_data.csv`
2. Refer to `data_dictionary.md` for column definitions
3. Test with small subset first (50-100 rows)
4. Gradually increase dataset size

---

**Current Status**: Dashboard displays **50/750 facilities** (optimized sample)  
**Ready to expand**: Follow Option 1 above to use full dataset
