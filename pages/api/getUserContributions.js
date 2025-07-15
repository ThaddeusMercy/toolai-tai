export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ error: 'Wallet address is required' });
  }

  try {
    // Fetch data from Google Sheets via OpenSheet
    const response = await fetch('https://opensheet.elk.sh/1PvNMomPOlWjdGFIs8G2MGG_4fAFVeQBMG-d7yMwg3JM/1');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const allData = await response.json();
    
    // Filter contributions for the specific wallet address
    const userContributions = allData
      .filter(tx => 
        tx["Wallet Address "] && 
        tx["Wallet Address "].toLowerCase() === walletAddress.toLowerCase()
      )
      .map(tx => ({
        timestamp: tx.Timestamp,
        amount: tx["Amount "].replace('$', ''),
        transactionHash: tx["Txn Hash"],
        network: tx.Network
      }))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    res.status(200).json({
      success: true,
      contributions: userContributions
    });

  } catch (error) {
    console.error('Error fetching user contributions:', error);
    res.status(500).json({ 
      error: 'Failed to fetch contributions',
      details: error.message 
    });
  }
} 