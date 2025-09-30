import React, { useState, useEffect } from 'react';
import { EditableText } from './EditableText';

type Currency = 'USD' | 'EUR' | 'GBP' | 'INR';

interface CostDisplayProps {
  cost: number;
  onCostChange: (newCost: number) => void;
  currency: Currency;
  showPricePerDay: boolean;
  totalWeeks: number;
}

const CURRENCY_SYMBOLS: { [key in Currency]: string } = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
};

const EXCHANGE_RATES: { [key in Currency]: number } = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.45,
};

export const CostDisplay: React.FC<CostDisplayProps> = ({ 
  cost, onCostChange, currency,
  showPricePerDay, totalWeeks
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const prevCostRef = React.useRef(cost);
  const prevCurrencyRef = React.useRef(currency);

  const convertedCost = cost * EXCHANGE_RATES[currency];

  const currencySymbol = CURRENCY_SYMBOLS[currency];
  const pricePerDay = totalWeeks > 0 ? convertedCost / (totalWeeks * 7) : 0;

  useEffect(() => {
    if (prevCostRef.current !== cost || prevCurrencyRef.current !== currency) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 400);
      prevCostRef.current = cost;
      prevCurrencyRef.current = currency;
      return () => clearTimeout(timer);
    }
  }, [cost, currency]);

  const handleValueChange = (newValue: string) => {
    const numericString = newValue.replace(/[^0-9.]/g, '');
    const newConvertedCost = parseFloat(numericString);
    if (!isNaN(newConvertedCost) && newConvertedCost >= 0) {
      const newBaseCost = newConvertedCost / EXCHANGE_RATES[currency];
      onCostChange(newBaseCost);
    }
  };

  return (
    <div className="text-left w-full">
        <div className="flex items-center mb-6">
            <p className="font-mono text-xs uppercase text-text-secondary h-4 flex items-center">
                {showPricePerDay ? (
                    <span className="text-highlight/80">
                        {currencySymbol}{pricePerDay.toFixed(2)} / day
                    </span>
                ) : (
                    'Price'
                )}
            </p>
       </div>
      <div aria-live="polite">
        <EditableText
          tag="p"
          value={`${currencySymbol}${convertedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          onChange={handleValueChange}
          wrapperClassName="summary-cost-value"
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter transition-all duration-300 ${isAnimating ? 'scale-105 text-highlight' : 'scale-100'}`}
          style={{ transitionProperty: 'transform, color' }}
        />
      </div>
    </div>
  );
};
