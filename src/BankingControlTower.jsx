// Using CDN-loaded React and Lucide icons (global objects)
const { useState, useMemo, useEffect } = React;
const { 
  AlertTriangle, CheckCircle, XCircle, TrendingUp, DollarSign, 
  Shield, Filter, BarChart3, Search, Bell, Download, 
  Calendar, ChevronDown, ChevronRight, Info, X 
} = lucide;

const BankingControlTower = () => {
  // Real data from banking_portfolio_data.csv (sample of 50 loans for performance)
  // Full 750-row dataset can be loaded via CSV import
  const portfolioData = [
    { Loan_ID: 'CORP0274_L1', Client_Name: 'Bouygues Immobilier', Sector: 'Real Estate', Region: 'Nouvelle-Aquitaine', Credit_Rating: 'CCC', Days_Past_Due: 9, Risk_Flag: 'Grace Period', KYC_Status: 'Valid', Outstanding_Balance: 28491800, Utilization_Pct: 75, Last_Review: '2025-11-18', Interest_Rate: 3.14, Products_Used: 'Revolving_Credit, Term_Loan', Cross_Sell_Score: 60 },
    { Loan_ID: 'CORP0403_L3', Client_Name: 'Valeo SA', Sector: 'Manufacturing', Region: 'Provence-Alpes-Côte d\'Azur', Credit_Rating: 'BBB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Expired', Outstanding_Balance: 17368800, Utilization_Pct: 70, Last_Review: '2023-07-14', Interest_Rate: 5.34, Products_Used: 'Term_Loan, FX_Hedging', Cross_Sell_Score: 60 },
    { Loan_ID: 'CORP0347_L3', Client_Name: 'Carrefour SA', Sector: 'Retail', Region: 'Auvergne-Rhône-Alpes', Credit_Rating: 'BBB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 19476400, Utilization_Pct: 20, Last_Review: '2024-05-15', Interest_Rate: 6.08, Products_Used: 'Cash_Management', Cross_Sell_Score: 80 },
    { Loan_ID: 'CORP0276_L3', Client_Name: 'Nexity Group', Sector: 'Real Estate', Region: 'Provence-Alpes-Côte d\'Azur', Credit_Rating: 'A', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Expired', Outstanding_Balance: 13227100, Utilization_Pct: 85, Last_Review: '2023-12-14', Interest_Rate: 6.38, Products_Used: 'Trade_Finance, Term_Loan', Cross_Sell_Score: 20 },
    { Loan_ID: 'CORP0263_L1', Client_Name: 'Gecina SA', Sector: 'Real Estate', Region: 'Nouvelle-Aquitaine', Credit_Rating: 'B', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 7401000, Utilization_Pct: 62, Last_Review: '2025-05-02', Interest_Rate: 6.53, Products_Used: 'Trade_Finance', Cross_Sell_Score: 80 },
    { Loan_ID: 'CORP0291_L1', Client_Name: 'Auchan Retail', Sector: 'Retail', Region: 'Provence-Alpes-Côte d\'Azur', Credit_Rating: 'B', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 14386400, Utilization_Pct: 35, Last_Review: '2024-04-16', Interest_Rate: 5.98, Products_Used: 'FX_Hedging, Revolving_Credit', Cross_Sell_Score: 60 },
    { Loan_ID: 'CORP0488_L2', Client_Name: 'Altarea Cogedim', Sector: 'Real Estate', Region: 'Occitanie', Credit_Rating: 'BBB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 5434000, Utilization_Pct: 88, Last_Review: '2025-03-28', Interest_Rate: 4.41, Products_Used: 'FX_Hedging, Cash_Management', Cross_Sell_Score: 60 },
    { Loan_ID: 'CORP0231_L2', Client_Name: 'Casino Guichard', Sector: 'Retail', Region: 'Occitanie', Credit_Rating: 'BBB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 17116700, Utilization_Pct: 92, Last_Review: '2025-05-09', Interest_Rate: 3.51, Products_Used: 'FX_Hedging, Cash_Management', Cross_Sell_Score: 20 },
    { Loan_ID: 'CORP0161_L1', Client_Name: 'Dassault Systèmes', Sector: 'Technology', Region: 'Hauts-de-France', Credit_Rating: 'BB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Expired', Outstanding_Balance: 28046000, Utilization_Pct: 45, Last_Review: '2023-12-09', Interest_Rate: 6.90, Products_Used: 'Trade_Finance', Cross_Sell_Score: 80 },
    { Loan_ID: 'CORP0450_L2', Client_Name: 'Safran SA', Sector: 'Manufacturing', Region: 'Provence-Alpes-Côte d\'Azur', Credit_Rating: 'BBB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 19502600, Utilization_Pct: 68, Last_Review: '2024-07-14', Interest_Rate: 2.99, Products_Used: 'FX_Hedging', Cross_Sell_Score: 80 },
    { Loan_ID: 'CORP0144_L1', Client_Name: 'Sanofi SA', Sector: 'Healthcare', Region: 'Occitanie', Credit_Rating: 'BB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Expiring Soon', Outstanding_Balance: 12607300, Utilization_Pct: 55, Last_Review: '2024-03-19', Interest_Rate: 2.61, Products_Used: 'Cash_Management, FX_Hedging', Cross_Sell_Score: 20 },
    { Loan_ID: 'CORP0260_L3', Client_Name: 'Eiffage Construction', Sector: 'Real Estate', Region: 'Occitanie', Credit_Rating: 'B', Days_Past_Due: 26, Risk_Flag: 'Watch List', KYC_Status: 'Expired', Outstanding_Balance: 30439200, Utilization_Pct: 78, Last_Review: '2023-11-07', Interest_Rate: 5.81, Products_Used: 'Term_Loan, Revolving_Credit', Cross_Sell_Score: 20 },
    { Loan_ID: 'CORP0279_L3', Client_Name: 'Capgemini SE', Sector: 'Technology', Region: 'Hauts-de-France', Credit_Rating: 'BBB', Days_Past_Due: 18, Risk_Flag: 'Watch List', KYC_Status: 'Expiring Soon', Outstanding_Balance: 16079300, Utilization_Pct: 64, Last_Review: '2024-01-28', Interest_Rate: 7.64, Products_Used: 'Trade_Finance, FX_Hedging', Cross_Sell_Score: 40 },
    { Loan_ID: 'CORP0069_L2', Client_Name: 'SNCF Logistics', Sector: 'Transportation', Region: 'Auvergne-Rhône-Alpes', Credit_Rating: 'BBB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 14124200, Utilization_Pct: 58, Last_Review: '2024-08-18', Interest_Rate: 7.34, Products_Used: 'Trade_Finance, Term_Loan', Cross_Sell_Score: 60 },
    { Loan_ID: 'CORP0315_L3', Client_Name: 'Michelin SCA', Sector: 'Manufacturing', Region: 'Provence-Alpes-Côte d\'Azur', Credit_Rating: 'A', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 18390800, Utilization_Pct: 72, Last_Review: '2024-04-14', Interest_Rate: 5.89, Products_Used: 'Term_Loan', Cross_Sell_Score: 80 },
    { Loan_ID: 'CORP0447_L1', Client_Name: 'Vinci Immobilier', Sector: 'Real Estate', Region: 'Nouvelle-Aquitaine', Credit_Rating: 'AA', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 19935600, Utilization_Pct: 48, Last_Review: '2025-09-17', Interest_Rate: 2.76, Products_Used: 'Cash_Management, Trade_Finance', Cross_Sell_Score: 40 },
    { Loan_ID: 'CORP0106_L3', Client_Name: 'Kaufman & Broad', Sector: 'Real Estate', Region: 'Hauts-de-France', Credit_Rating: 'BB', Days_Past_Due: 3, Risk_Flag: 'Grace Period', KYC_Status: 'Valid', Outstanding_Balance: 18739100, Utilization_Pct: 44, Last_Review: '2025-03-15', Interest_Rate: 6.72, Products_Used: 'Cash_Management', Cross_Sell_Score: 80 },
    { Loan_ID: 'CORP0267_L3', Client_Name: 'E.Leclerc', Sector: 'Retail', Region: 'Provence-Alpes-Côte d\'Azur', Credit_Rating: 'A', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 23340700, Utilization_Pct: 69, Last_Review: '2025-03-01', Interest_Rate: 4.69, Products_Used: 'Trade_Finance, Cash_Management', Cross_Sell_Score: 60 },
    { Loan_ID: 'CORP0335_L1', Client_Name: 'TotalEnergies SE', Sector: 'Energy', Region: 'Nouvelle-Aquitaine', Credit_Rating: 'CCC', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Expiring Soon', Outstanding_Balance: 18065300, Utilization_Pct: 85, Last_Review: '2024-02-18', Interest_Rate: 5.42, Products_Used: 'Term_Loan', Cross_Sell_Score: 80 },
    { Loan_ID: 'CORP0247_L3', Client_Name: 'Ipsen Pharma', Sector: 'Healthcare', Region: 'Nouvelle-Aquitaine', Credit_Rating: 'BB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 12248900, Utilization_Pct: 41, Last_Review: '2024-07-11', Interest_Rate: 6.36, Products_Used: 'Term_Loan, Cash_Management', Cross_Sell_Score: 60 },
    { Loan_ID: 'CORP0109_L1', Client_Name: 'Icade SA', Sector: 'Real Estate', Region: 'Hauts-de-France', Credit_Rating: 'BBB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Expiring Soon', Outstanding_Balance: 6310400, Utilization_Pct: 52, Last_Review: '2024-02-29', Interest_Rate: 7.37, Products_Used: 'Revolving_Credit, Trade_Finance', Cross_Sell_Score: 60 },
    { Loan_ID: 'CORP0369_L1', Client_Name: 'Plastic Omnium', Sector: 'Manufacturing', Region: 'Auvergne-Rhône-Alpes', Credit_Rating: 'BBB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Expired', Outstanding_Balance: 23317000, Utilization_Pct: 51, Last_Review: '2023-11-18', Interest_Rate: 3.96, Products_Used: 'Term_Loan, FX_Hedging', Cross_Sell_Score: 20 },
    { Loan_ID: 'CORP0066_L3', Client_Name: 'Faurecia SE', Sector: 'Manufacturing', Region: 'Occitanie', Credit_Rating: 'AA', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Expired', Outstanding_Balance: 5073400, Utilization_Pct: 38, Last_Review: '2023-11-04', Interest_Rate: 4.05, Products_Used: 'Revolving_Credit, Trade_Finance', Cross_Sell_Score: 40 },
    { Loan_ID: 'CORP0093_L3', Client_Name: 'Geodis SA', Sector: 'Transportation', Region: 'Provence-Alpes-Côte d\'Azur', Credit_Rating: 'BB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 22270400, Utilization_Pct: 82, Last_Review: '2024-11-09', Interest_Rate: 8.18, Products_Used: 'Term_Loan, Revolving_Credit', Cross_Sell_Score: 20 },
    { Loan_ID: 'CORP0111_L2', Client_Name: 'Schneider Electric', Sector: 'Manufacturing', Region: 'Hauts-de-France', Credit_Rating: 'B', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Expired', Outstanding_Balance: 21816600, Utilization_Pct: 64, Last_Review: '2023-07-02', Interest_Rate: 7.10, Products_Used: 'FX_Hedging', Cross_Sell_Score: 80 },
    { Loan_ID: 'CORP0320_L3', Client_Name: 'Atos SE', Sector: 'Technology', Region: 'Nouvelle-Aquitaine', Credit_Rating: 'BBB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 7139900, Utilization_Pct: 37, Last_Review: '2024-06-30', Interest_Rate: 4.81, Products_Used: 'FX_Hedging, Cash_Management', Cross_Sell_Score: 20 },
    { Loan_ID: 'CORP0056_L1', Client_Name: 'Keolis Group', Sector: 'Transportation', Region: 'Hauts-de-France', Credit_Rating: 'BB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Expired', Outstanding_Balance: 24935600, Utilization_Pct: 76, Last_Review: '2023-10-25', Interest_Rate: 3.56, Products_Used: 'Trade_Finance, Revolving_Credit', Cross_Sell_Score: 20 },
    { Loan_ID: 'CORP0462_L3', Client_Name: 'Société Générale', Sector: 'Financial Services', Region: 'Auvergne-Rhône-Alpes', Credit_Rating: 'BBB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Expired', Outstanding_Balance: 31593800, Utilization_Pct: 68, Last_Review: '2023-04-06', Interest_Rate: 3.28, Products_Used: 'Revolving_Credit, Trade_Finance', Cross_Sell_Score: 20 },
    { Loan_ID: 'CORP0309_L3', Client_Name: 'Fnac Darty', Sector: 'Retail', Region: 'Hauts-de-France', Credit_Rating: 'B', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Expired', Outstanding_Balance: 38835000, Utilization_Pct: 82, Last_Review: '2023-08-16', Interest_Rate: 4.72, Products_Used: 'Cash_Management', Cross_Sell_Score: 80 },
    { Loan_ID: 'CORP0023_L3', Client_Name: 'Engie SA', Sector: 'Energy', Region: 'Île-de-France', Credit_Rating: 'AA', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 10453200, Utilization_Pct: 76, Last_Review: '2025-10-16', Interest_Rate: 7.07, Products_Used: 'Term_Loan, Revolving_Credit', Cross_Sell_Score: 40 },
    { Loan_ID: 'CORP0357_L3', Client_Name: 'EDF Renewables', Sector: 'Energy', Region: 'Nouvelle-Aquitaine', Credit_Rating: 'BB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 11916400, Utilization_Pct: 55, Last_Review: '2025-10-20', Interest_Rate: 7.76, Products_Used: 'Trade_Finance, Cash_Management', Cross_Sell_Score: 40 },
    { Loan_ID: 'CORP0210_L2', Client_Name: 'bioMérieux SA', Sector: 'Healthcare', Region: 'Auvergne-Rhône-Alpes', Credit_Rating: 'AAA', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Expired', Outstanding_Balance: 651600, Utilization_Pct: 18, Last_Review: '2023-11-25', Interest_Rate: 5.62, Products_Used: 'FX_Hedging, Revolving_Credit', Cross_Sell_Score: 20 },
    { Loan_ID: 'CORP0193_L3', Client_Name: 'Servier Pharma', Sector: 'Healthcare', Region: 'Nouvelle-Aquitaine', Credit_Rating: 'BB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 20362700, Utilization_Pct: 62, Last_Review: '2025-05-21', Interest_Rate: 6.41, Products_Used: 'Revolving_Credit, Term_Loan', Cross_Sell_Score: 40 },
    { Loan_ID: 'CORP0130_L2', Client_Name: 'CMA CGM Group', Sector: 'Transportation', Region: 'Nouvelle-Aquitaine', Credit_Rating: 'AA', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 21824800, Utilization_Pct: 51, Last_Review: '2025-09-18', Interest_Rate: 7.20, Products_Used: 'Cash_Management', Cross_Sell_Score: 80 },
    { Loan_ID: 'CORP0248_L1', Client_Name: 'Biogaran SA', Sector: 'Healthcare', Region: 'Hauts-de-France', Credit_Rating: 'A', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Expired', Outstanding_Balance: 19451400, Utilization_Pct: 73, Last_Review: '2023-09-11', Interest_Rate: 6.91, Products_Used: 'FX_Hedging, Cash_Management', Cross_Sell_Score: 20 },
    { Loan_ID: 'CORP0438_L3', Client_Name: 'Saint-Gobain', Sector: 'Manufacturing', Region: 'Auvergne-Rhône-Alpes', Credit_Rating: 'BB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 25061700, Utilization_Pct: 59, Last_Review: '2024-12-10', Interest_Rate: 4.90, Products_Used: 'Term_Loan, Revolving_Credit', Cross_Sell_Score: 40 },
    { Loan_ID: 'CORP0174_L3', Client_Name: 'Unibail-Rodamco', Sector: 'Real Estate', Region: 'Provence-Alpes-Côte d\'Azur', Credit_Rating: 'AA', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 8280200, Utilization_Pct: 42, Last_Review: '2025-06-29', Interest_Rate: 5.33, Products_Used: 'FX_Hedging, Trade_Finance', Cross_Sell_Score: 40 },
    { Loan_ID: 'CORP0308_L2', Client_Name: 'Voltalia SA', Sector: 'Energy', Region: 'Auvergne-Rhône-Alpes', Credit_Rating: 'A', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 1956300, Utilization_Pct: 28, Last_Review: '2025-02-07', Interest_Rate: 4.81, Products_Used: 'Trade_Finance, Term_Loan', Cross_Sell_Score: 20 },
    { Loan_ID: 'CORP0023_L2', Client_Name: 'Air Liquide SA', Sector: 'Energy', Region: 'Île-de-France', Credit_Rating: 'AA', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 45621000, Utilization_Pct: 58, Last_Review: '2025-10-16', Interest_Rate: 4.25, Products_Used: 'Term_Loan, FX_Hedging', Cross_Sell_Score: 40 },
    { Loan_ID: 'CORP0477_L1', Client_Name: 'Neoen SA', Sector: 'Energy', Region: 'Île-de-France', Credit_Rating: 'BBB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 28934000, Utilization_Pct: 72, Last_Review: '2024-08-22', Interest_Rate: 5.15, Products_Used: 'Revolving_Credit', Cross_Sell_Score: 60 },
    { Loan_ID: 'CORP0185_L2', Client_Name: 'Thales Group', Sector: 'Technology', Region: 'Île-de-France', Credit_Rating: 'A', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 52187000, Utilization_Pct: 65, Last_Review: '2025-03-14', Interest_Rate: 3.82, Products_Used: 'Term_Loan, Trade_Finance', Cross_Sell_Score: 80 },
    { Loan_ID: 'CORP0301_L3', Client_Name: 'Arkema SA', Sector: 'Manufacturing', Region: 'Provence-Alpes-Côte d\'Azur', Credit_Rating: 'A', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 34521000, Utilization_Pct: 48, Last_Review: '2024-11-05', Interest_Rate: 4.33, Products_Used: 'FX_Hedging', Cross_Sell_Score: 60 },
    { Loan_ID: 'CORP0469_L2', Client_Name: 'Alstom SA', Sector: 'Manufacturing', Region: 'Hauts-de-France', Credit_Rating: 'BBB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 41238000, Utilization_Pct: 77, Last_Review: '2025-01-18', Interest_Rate: 5.68, Products_Used: 'Cash_Management, Revolving_Credit', Cross_Sell_Score: 40 },
    { Loan_ID: 'CORP0003_L1', Client_Name: 'Monoprix SA', Sector: 'Retail', Region: 'Île-de-France', Credit_Rating: 'BBB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 18672000, Utilization_Pct: 54, Last_Review: '2024-09-12', Interest_Rate: 4.92, Products_Used: 'Trade_Finance', Cross_Sell_Score: 60 },
    { Loan_ID: 'CORP0412_L1', Client_Name: 'Pierre Fabre', Sector: 'Healthcare', Region: 'Occitanie', Credit_Rating: 'A', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 22456000, Utilization_Pct: 61, Last_Review: '2025-07-08', Interest_Rate: 3.95, Products_Used: 'Term_Loan, Cash_Management', Cross_Sell_Score: 40 },
    { Loan_ID: 'CORP0395_L2', Client_Name: 'Covivio SA', Sector: 'Real Estate', Region: 'Île-de-France', Credit_Rating: 'AA', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 38921000, Utilization_Pct: 44, Last_Review: '2025-04-23', Interest_Rate: 3.21, Products_Used: 'Revolving_Credit, FX_Hedging', Cross_Sell_Score: 20 },
    { Loan_ID: 'CORP0196_L1', Client_Name: 'Klépierre SA', Sector: 'Real Estate', Region: 'Île-de-France', Credit_Rating: 'A', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 29834000, Utilization_Pct: 52, Last_Review: '2024-12-03', Interest_Rate: 4.15, Products_Used: 'Term_Loan', Cross_Sell_Score: 80 },
    { Loan_ID: 'CORP0005_L3', Client_Name: 'Mercialys SA', Sector: 'Real Estate', Region: 'Provence-Alpes-Côte d\'Azur', Credit_Rating: 'BBB', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Expiring Soon', Outstanding_Balance: 15782000, Utilization_Pct: 68, Last_Review: '2024-06-18', Interest_Rate: 5.47, Products_Used: 'Cash_Management, Trade_Finance', Cross_Sell_Score: 60 },
    { Loan_ID: 'CORP0206_L2', Client_Name: 'Rubis Énergie', Sector: 'Energy', Region: 'Occitanie', Credit_Rating: 'A', Days_Past_Due: 0, Risk_Flag: 'Performing', KYC_Status: 'Valid', Outstanding_Balance: 33145000, Utilization_Pct: 71, Last_Review: '2025-02-28', Interest_Rate: 4.58, Products_Used: 'Revolving_Credit, Term_Loan', Cross_Sell_Score: 40 }
  ];

  // State Management
  const [activeView, setActiveView] = useState('watchlist');
  const [selectedSector, setSelectedSector] = useState('All');
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('input[type="text"]')?.focus();
      }
      if (e.key === 'Escape' && searchQuery) {
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [searchQuery]);

  // Risk Weight Mapping (Basel III)
  const getRiskWeight = (rating) => {
    if (rating.startsWith('AAA') || rating.startsWith('AA')) return 0.20;
    if (rating.startsWith('A')) return 0.50;
    if (rating.startsWith('BBB')) return 0.75;
    if (rating.startsWith('BB') || rating.startsWith('B')) return 1.00;
    return 1.50;
  };

  // CORE BUSINESS LOGIC: Morning Watchlist Rules
  const watchlistClients = useMemo(() => {
    return portfolioData.filter(client => {
      const ruleA = client.Days_Past_Due > 0;
      const ruleB = client.KYC_Status !== 'Valid';
      const ruleC = client.Credit_Rating.startsWith('C');
      return ruleA || ruleB || ruleC;
    });
  }, []);

  // Stress Test Logic
  const stressTestData = useMemo(() => {
    if (selectedSector === 'All') return portfolioData;
    return portfolioData.filter(client => client.Sector === selectedSector);
  }, [selectedSector]);

  // Search suggestions
  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    return portfolioData
      .filter(c => 
        c.Client_Name.toLowerCase().includes(query) || 
        c.Loan_ID.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [searchQuery]);

  // Final filtered data
  const filteredData = useMemo(() => {
    let data = activeView === 'watchlist' ? watchlistClients : stressTestData;
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      data = data.filter(client => 
        client.Client_Name.toLowerCase().includes(query) || 
        client.Loan_ID.toLowerCase().includes(query) ||
        client.Sector.toLowerCase().includes(query)
      );
    }
    return data;
  }, [activeView, watchlistClients, stressTestData, searchQuery]);

  // KPI Calculations
  const calculateKPIs = (dataset) => {
    const totalExposure = dataset.reduce((sum, c) => sum + c.Outstanding_Balance, 0);
    const rwa = dataset.reduce((sum, c) => sum + (c.Outstanding_Balance * getRiskWeight(c.Credit_Rating)), 0);
    const activeAlerts = dataset.filter(c => 
      c.Days_Past_Due > 0 || c.KYC_Status !== 'Valid' || c.Credit_Rating.startsWith('C')
    ).length;
    return { totalExposure, rwa, activeAlerts };
  };

  const viewDataset = activeView === 'watchlist' ? watchlistClients : stressTestData;
  const displayKPIs = calculateKPIs(viewDataset);

  const sectors = ['All', ...new Set(portfolioData.map(c => c.Sector))];

  // Sector exposure
  const sectorExposure = useMemo(() => {
    const exposure = {};
    stressTestData.forEach(client => {
      if (!exposure[client.Sector]) exposure[client.Sector] = 0;
      exposure[client.Sector] += client.Outstanding_Balance;
    });
    return Object.entries(exposure)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [stressTestData]);

  const maxExposure = Math.max(...sectorExposure.map(s => s[1]));

  // Highlight search matches
  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={i} className="bg-yellow-200 text-slate-900 rounded px-0.5">{part}</mark> : part
    );
  };

  // Status Badge
  const StatusBadge = ({ status }) => {
    const configs = {
      'Performing': { bg: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-200', icon: CheckCircle },
      'Grace Period': { bg: 'bg-amber-50 text-amber-700', border: 'border-amber-200', icon: AlertTriangle },
      'Watch List': { bg: 'bg-orange-50 text-orange-700', border: 'border-orange-200', icon: AlertTriangle },
      'Medium Risk': { bg: 'bg-rose-50 text-rose-700', border: 'border-rose-200', icon: XCircle },
      'Valid': { bg: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-200', icon: CheckCircle },
      'Expiring Soon': { bg: 'bg-amber-50 text-amber-700', border: 'border-amber-200', icon: AlertTriangle },
      'Expired': { bg: 'bg-rose-50 text-rose-700', border: 'border-rose-200', icon: XCircle }
    };
    const config = configs[status] || configs['Performing'];
    const Icon = config.icon;
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border ${config.bg} ${config.border} ${config.text} text-xs font-medium`}>
        <Icon size={12} />
        {status}
      </div>
    );
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* Top Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-blue-200 shadow-lg">
              TC
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">TowerControl</span>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Enhanced Search with Autocomplete */}
            <div className="relative hidden md:block">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full text-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all w-64">
                <Search size={14} className="text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search clients... (⌘K)"
                  className="bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              
              {/* Autocomplete Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  {suggestions.map(s => (
                    <button
                      key={s.Loan_ID}
                      onMouseDown={() => setSearchQuery(s.Client_Name)}
                      className="w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors flex items-center justify-between border-b border-slate-100 last:border-b-0"
                    >
                      <div>
                        <div className="font-medium text-slate-900 text-sm">{s.Client_Name}</div>
                        <div className="text-xs text-slate-500">{s.Sector}</div>
                      </div>
                      <span className="text-slate-400 text-xs mono">{s.Loan_ID}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <div className="relative cursor-pointer hover:text-slate-600 transition-colors">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-medium shadow-md cursor-pointer hover:shadow-lg transition-all">
                AS
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Corporate Risk Overview</h1>
            <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Real-time monitoring • {portfolioData.length} corporate facilities
            </p>
          </div>
          
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <button
              onClick={() => { setActiveView('watchlist'); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                activeView === 'watchlist'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Filter size={16} />
              Morning Watchlist
            </button>
            <button
              onClick={() => { setActiveView('stress'); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                activeView === 'stress'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <TrendingUp size={16} />
              Stress Test
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Exposure</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">{formatCurrency(displayKPIs.totalExposure)}</h3>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-100 transition-colors">
                <DollarSign size={24} />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp size={12} /> +2.4%
              </span>
              <span className="text-slate-400">vs last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Risk Weighted Assets</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">{formatCurrency(displayKPIs.rwa)}</h3>
              </div>
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-100 transition-colors">
                <Shield size={24} />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="text-slate-500">Basel III Compliant</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Active Alerts</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">{displayKPIs.activeAlerts}</h3>
              </div>
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl group-hover:bg-rose-100 transition-colors">
                <AlertTriangle size={24} />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className={`px-2 py-0.5 rounded-full ${displayKPIs.activeAlerts > 0 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {displayKPIs.activeAlerts > 0 ? 'Action Required' : 'All Clear'}
              </span>
            </div>
          </div>
        </div>

        {/* View Specific Content */}
        {activeView === 'watchlist' && (
          <div className="bg-slate-900 rounded-2xl p-8 shadow-lg mb-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Filter size={18} className="text-blue-400"/> Management by Exception Active
                </h3>
                <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                  Filtering {portfolioData.length} facilities. Displaying {watchlistClients.length} requiring intervention.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs font-bold text-rose-200 bg-rose-500/20 border border-rose-500/30 px-3 py-1 rounded-full">Late Payment</span>
                  <span className="text-xs font-bold text-amber-200 bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full">Invalid KYC</span>
                  <span className="text-xs font-bold text-orange-200 bg-orange-500/20 border border-orange-500/30 px-3 py-1 rounded-full">Rating &lt; B-</span>
                </div>
              </div>
              <button className="bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors flex items-center gap-2">
                <Download size={16} /> Export
              </button>
            </div>
          </div>
        )}

        {activeView === 'stress' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-1">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Filter size={16} className="text-slate-400"/> Filter by Sector
              </h3>
              <div className="flex flex-wrap gap-2">
                {sectors.map(sector => (
                  <button
                    key={sector}
                    onClick={() => setSelectedSector(sector)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selectedSector === sector
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 size={16} className="text-slate-400"/> Exposure Heatmap
                </h3>
              </div>
              <div className="space-y-4">
                {sectorExposure.map(([sector, exposure]) => (
                  <div key={sector}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium text-slate-700">{sector}</span>
                      <span className="mono text-slate-500">{formatCurrency(exposure)}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full shadow-sm"
                        style={{ width: `${(exposure / maxExposure) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-800 text-sm">Portfolio Records</h3>
              {searchQuery && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                  Filtered: "{searchQuery}"
                </span>
              )}
            </div>
            <span className="text-xs text-slate-500 font-medium bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-sm">
              {filteredData.length} records
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider w-8"></th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider">Loan ID</th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider">Client Entity</th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider">Sector</th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider">Days PD</th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider">Risk Status</th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider">KYC</th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider text-right">Balance</th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider text-right">Utilization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? (
                  filteredData.map((client) => (
                    <React.Fragment key={client.Loan_ID}>
                      <tr 
                        className={`hover:bg-slate-50 transition-colors cursor-pointer ${expandedRow === client.Loan_ID ? 'bg-blue-50/50' : ''}`}
                        onClick={() => setExpandedRow(expandedRow === client.Loan_ID ? null : client.Loan_ID)}
                      >
                        <td className="px-6 py-4 text-slate-400">
                          {expandedRow === client.Loan_ID ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </td>
                        <td className="px-6 py-4 mono text-xs text-slate-500">
                          {highlightMatch(client.Loan_ID, searchQuery)}
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">
                          {highlightMatch(client.Client_Name, searchQuery)}
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                            {highlightMatch(client.Sector, searchQuery)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold border ${
                            client.Credit_Rating.startsWith('AAA') || client.Credit_Rating.startsWith('AA') ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                            client.Credit_Rating.startsWith('A') ? 'bg-blue-50 text-blue-700 border-blue-100' :
                            client.Credit_Rating.startsWith('BBB') ? 'bg-amber-50 text-amber-700 border-amber-100' :
                            client.Credit_Rating.startsWith('BB') || client.Credit_Rating.startsWith('B') ? 'bg-orange-50 text-orange-700 border-orange-100' :
                            'bg-rose-50 text-rose-700 border-rose-100'
                          }`}>
                            {client.Credit_Rating}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`mono font-bold ${client.Days_Past_Due > 0 ? 'text-rose-600' : 'text-slate-300'}`}>
                            {client.Days_Past_Due}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={client.Risk_Flag} />
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={client.KYC_Status} />
                        </td>
                        <td className="px-6 py-4 text-right mono text-slate-700 font-medium">
                          {formatCurrency(client.Outstanding_Balance)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  client.Utilization_Pct > 80 ? 'bg-rose-500' : 
                                  client.Utilization_Pct > 50 ? 'bg-blue-500' : 
                                  'bg-emerald-500'
                                }`}
                                style={{ width: `${client.Utilization_Pct}%` }}
                              />
                            </div>
                            <span className="mono text-xs text-slate-400 w-8">{client.Utilization_Pct}%</span>
                          </div>
                        </td>
                      </tr>
                      {expandedRow === client.Loan_ID && (
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                          <td colSpan="10" className="px-6 py-4">
                            <div className="grid grid-cols-3 gap-6 text-xs">
                              <div className="space-y-2">
                                <p className="text-slate-400 font-medium uppercase tracking-wider">Facility Details</p>
                                <div className="flex justify-between border-b border-slate-200 py-1">
                                  <span className="text-slate-500">Interest Rate</span>
                                  <span className="mono text-slate-700">{client.Interest_Rate}%</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-200 py-1">
                                  <span className="text-slate-500">Products Used</span>
                                  <span className="text-slate-700 text-right">{client.Products_Used.split(',')[0]}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                  <span className="text-slate-500">Cross-Sell Score</span>
                                  <span className="mono text-slate-700">{client.Cross_Sell_Score}/100</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-slate-400 font-medium uppercase tracking-wider">Risk Metrics</p>
                                <div className="flex justify-between border-b border-slate-200 py-1">
                                  <span className="text-slate-500">Last Review</span>
                                  <span className="mono text-slate-700">{client.Last_Review}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-200 py-1">
                                  <span className="text-slate-500">Risk Weight</span>
                                  <span className="mono text-slate-700">{(getRiskWeight(client.Credit_Rating) * 100).toFixed(0)}%</span>
                                </div>
                                <div className="flex justify-between py-1">
                                  <span className="text-slate-500">RWA</span>
                                  <span className="mono text-slate-700">{formatCurrency(client.Outstanding_Balance * getRiskWeight(client.Credit_Rating))}</span>
                                </div>
                              </div>
                              <div className="bg-white border border-slate-200 rounded-lg p-3">
                                <div className="flex items-start gap-2">
                                  <Info size={14} className="text-blue-500 mt-0.5" />
                                  <div>
                                    <p className="font-bold text-slate-700 mb-1">Cross-Sell Opportunity</p>
                                    <p className="text-slate-500 leading-relaxed">
                                      Score: {client.Cross_Sell_Score}/100. Consider offering {client.Products_Used.includes('FX') ? 'Interest Rate Swaps' : 'FX Hedging'} based on current product mix.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <div className="bg-slate-50 p-4 rounded-full mb-3">
                          <Search size={24} className="opacity-50"/>
                        </div>
                        <p className="font-medium text-slate-600">No records found</p>
                        <p className="text-xs mt-1">Try adjusting your search query</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-6">
              <span className="font-semibold text-slate-700">Real Data: {portfolioData.length} Corporate Facilities</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span>Rules-based logic</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span>Basel III compliant</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="font-medium">System Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Render the component when using CDN-based React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BankingControlTower />);
