import React, { useState } from "react";
import { useRouter } from "next/router";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    if (hasAccepted) {
      onClose();
      router.push("/presale");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-[#08222B] rounded-[16px] max-w-[700px] w-full max-h-[80vh] overflow-y-auto border border-[#1FE2D6]">
        <div className="p-6">
          <h2 className="text-[#1FE2D6] text-[24px] font-bold mb-2 text-center">
            TOOLAI LLC
          </h2>
          <h3 className="text-[#1FE2D6] text-[20px] font-medium mb-6 text-center">
            TAI+ Token Presale Agreement
          </h3>
          
          <div className="text-[#FFFFFF] text-[14px] space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
            <p className="font-medium">
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
                  <li>10% of the tokens vest each month.</li>
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
                <p className="mt-2">If tokens are not distributed within 90 days, ToolAi will refund your payment in USD equivalent within 30 additional days.</p>
              </div>
              
              <div>
                <p className="font-semibold text-[#1FE2D6] mb-2">8. Legal Governance</p>
                <p>This Agreement is governed by the laws of the United States of America.</p>
              </div>
              
              <div>
                <p className="font-semibold text-[#1FE2D6] mb-2">9. Liability Disclaimer</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>ToolAi is not a financial advisor and is not responsible for any investment gains or losses.</li>
                  <li>By purchasing TAI+, you own the tokens outright, with no further obligations from ToolAi or its partners.</li>
                  <li>Purchasing TAI+ is not an investment, and there are no refunds or returns.</li>
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
          
          <div className="border-t border-[#1FE2D6] pt-4">
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
            
            <div className="flex gap-4 justify-end">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-[12px] border border-[#1FE2D6] text-[#1FE2D6] font-medium hover:bg-[#1FE2D6] hover:bg-opacity-10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                disabled={!hasAccepted}
                className={`px-6 py-3 rounded-[12px] font-medium lg:text-base text-base transition-all ${
                  hasAccepted
                    ? "bg-[#1FE2D6] text-[#00334B] hover:bg-[#1BC7BC]"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continue Presale
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal; 