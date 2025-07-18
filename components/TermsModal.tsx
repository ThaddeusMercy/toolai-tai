import React, { useState } from "react";
import { useRouter } from "next/router";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: (accepted: boolean) => void;  // Custom callback for when accepted
  mode?: 'navigation' | 'agreement';       // Navigation mode or just agreement
  showCheckbox?: boolean;                  // Show checkbox or just button
  acceptButtonText?: string;               // Custom button text
  theme?: 'dark' | 'teal';                // Theme variations
}

const TermsModal: React.FC<TermsModalProps> = ({ 
  isOpen, 
  onClose, 
  onAccept,
  mode = 'navigation',
  showCheckbox = true,
  acceptButtonText = 'Continue Presale',
  theme = 'teal'
}) => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    if (showCheckbox && !hasAccepted) return;
    
    if (onAccept) {
      onAccept(true);
    }
    
    if (mode === 'navigation') {
      router.push("/presale");
    }
    
    onClose();
  };

  if (!isOpen) return null;

  // Theme-based styling
  const bgColor = theme === 'dark' ? 'bg-[#0A1B24]' : 'bg-[#08222B]';
  const borderColor = theme === 'dark' ? 'border-gray-600' : 'border-[#1FE2D6]';
  const maxWidth = theme === 'dark' ? 'max-w-4xl' : 'max-w-[700px]';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${bgColor} rounded-lg ${maxWidth} w-full max-h-[85vh] sm:max-h-[80vh] overflow-y-auto mx-4 ${borderColor} ${theme === 'teal' ? 'border' : ''}`}>
        <div className="p-4 sm:p-6">
          <h3 className={`text-lg sm:text-xl font-semibold mb-4 ${theme === 'teal' ? 'text-[#1FE2D6] text-center' : 'text-white'}`}>
            {theme === 'teal' && (
              <>
                <div className="text-[#1FE2D6] text-[24px] font-bold mb-2">TOOLAI LLC</div>
                <div className="text-[#1FE2D6] text-[20px] font-medium mb-6">TAI+ Token Presale Agreement</div>
              </>
            )}
            {theme === 'dark' && 'ToolAi LLC TAI+ Token Presale Agreement'}
          </h3>
          
          <div className="text-white space-y-4 mb-6 max-h-60 sm:max-h-96 overflow-y-auto text-left">
            <div className="text-xs sm:text-sm leading-relaxed">
              <div className="mb-4">
                <p className="font-semibold text-white">
                  <strong>TOOLAI LLC</strong><br />
                  TAI+ Token Presale Agreement
                </p>
              </div>

              <p className="mb-4 text-white">
                <strong>Parties:</strong> ToolAi LLC (a Delaware Limited Liability Company) and the "Customer" (you, the purchaser)
              </p>
            
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-[#1FE2D6] mb-2">1. Introduction</p>
                <p>ToolAi LLC operates an AI-powered cryptocurrency platform that transforms knowledge into AI Intellectual Properties (AiiPs) using the TAI+ token. You are entering into this Agreement to participate in the presale of TAI+ tokens.</p>
              </div>
              
              <div>
                <p className="font-semibold text-[#1FE2D6] mb-2">2. Token Purchase</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>You agree to purchase TAI+ tokens at the presale price of $0.005 USD per token.</li>
                  <li>You may pay for your TAI+ presale with any coin available to trade in your connected DeFi wallet (Connect your DeFi Wallet on next screen).</li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold text-[#1FE2D6] mb-2">3. Vesting Schedule</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Your purchased tokens will vest over time.</li>
                  <li>10% of the tokens vest each month (starting from launch date).</li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold text-[#1FE2D6] mb-2">4. Vesting Conditions</p>
                <p className="mb-2">You agree:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Not to transfer, sell, or assign tokens during the vesting period.</li>
                  <li>To comply with all applicable state and federal laws.</li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold text-[#1FE2D6] mb-2">5. Token Distribution</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Tokens will be distributed monthly to the same DeFi Wallet (BSC Smart Chain -or SOL Solana) used for your purchase.</li>
                  <li><strong>DO NOT</strong> use a centralized exchange (e.g., Coinbase, Binance). ToolAi is not responsible for lost tokens sent to centralized platforms.</li>
                  <li><strong>Recommended wallets:</strong> Trust Wallet or MetaMask.</li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold text-[#1FE2D6] mb-2">6. Fees and Taxes</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>You are responsible for all local taxes, gas fees, and transaction costs.</li>
                  <li>These are not included in the token purchase price.</li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold text-[#1FE2D6] mb-2">7. Your Representations</p>
                <p className="mb-2">By participating, you confirm:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>You have the authority and legal capacity to enter this Agreement.</li>
                  <li>You understand and agree to all terms.</li>
                  <li>Sales are final, and ToolAi provides no warranties or guarantees beyond proof of token transfer.</li>
                </ul>
                <p className="mt-2">If tokens are not distributed within 90 days, ToolAi will refund your payment in USD equivalent within 30 days from request date.</p>
              </div>
              
              <div>
                <p className="font-semibold text-[#1FE2D6] mb-2">8. Legal Governance</p>
                <p>This Agreement is governed by the laws of the United States of America.</p>
              </div>
              
              <div>
                <p className="font-semibold text-[#1FE2D6] mb-2">9. Liability Disclaimer</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>ToolAi is not a financial advisor and is not responsible for any token gains or losses.</li>
                  <li>By purchasing TAI+, you own the tokens outright, with no further obligations from ToolAi or its partners.</li>
                  <li>Purchasing TAI+ is not an token, and there are no refunds or returns.</li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold text-[#1FE2D6] mb-2">10. Dispute Resolution</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Disputes will be resolved by binding arbitration under the American Arbitration Association rules.</li>
                  <li>Arbitration will take place in the city of ToolAi's primary office.</li>
                  <li>Each party pays their own legal costs unless the arbitrator rules otherwise.</li>
                </ul>
              </div>
              
              <div className="border-t border-[#1FE2D6] pt-4 mt-6">
                <p className="font-semibold text-[#1FE2D6] mb-2">Acknowledgment</p>
                <p className="mb-2">By clicking "I Agree," you confirm that you:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Have read and understood this Agreement,</li>
                  <li>Accept all its terms and conditions,</li>
                  <li>Are legally able to enter into this contract.</li>
                </ul>
              </div>
            </div>
            </div>
          </div>
          
          <div className={`flex flex-col gap-3 sm:gap-4 sticky bottom-0 ${bgColor} pt-4`}>
            {showCheckbox && (
              <label className="flex items-start gap-3 cursor-pointer mb-6">
                <input
                  type="checkbox"
                  checked={hasAccepted}
                  onChange={(e) => setHasAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#1FE2D6]"
                />
                <span className="text-[#FFFFFF] text-[14px] leading-relaxed">
                  I Agree to the ToolAi LLC TAI+ Token Presale Terms
                </span>
              </label>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-all text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                disabled={showCheckbox ? !hasAccepted : false}
                className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                  (showCheckbox && !hasAccepted)
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-[#1FE2D6] hover:bg-[#1BC7BC] text-[#00334B]"
                }`}
              >
                {acceptButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal; 