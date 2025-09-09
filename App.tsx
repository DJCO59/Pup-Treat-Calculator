import React, { useState, useMemo } from 'react';
import { BehaviorCard } from './components/BehaviorCard';
import { TreatInput } from './components/TreatInput';
import { BehaviorType } from './types';
import { formatCount } from "./utils/format";
import { Badge } from "./components/Badge";


const PawPrintIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 18c-.83 0-1.5-.67-1.5-1.5S8.67 15 9.5 15s1.5.67 1.5 1.5S10.33 18 9.5 18zm1.5-5c-.83 0-1.5-.67-1.5-1.5S10.17 10 11 10s1.5.67 1.5 1.5S11.83 13 11 13zm2-3c-.83 0-1.5-.67-1.5-1.5S12.17 7 13 7s1.5.67 1.5 1.5S13.83 10 13 10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S15.67 8 16.5 8s1.5.67 1.5 1.5S17.33 11 16.5 11z"/>
  </svg>
);

// Configuration for all possible behaviors, including their cost in treats.
const BEHAVIORS_CONFIG = [
  { type: BehaviorType.CuteLook, title: "Cute Looks", cost: 2, color: "bg-sky-400" },
  { type: BehaviorType.Begging, title: "Begging (Paws Up)", cost: 3, color: "bg-indigo-400" },
  { type: BehaviorType.HeadTilt, title: "Head Tilts", cost: 4, color: "bg-rose-400" },
  { type: BehaviorType.ShakePaw, title: "Shake Paw", cost: 5, color: "bg-fuchsia-400" },
  { type: BehaviorType.RollOver, title: "Roll Overs", cost: 6, color: "bg-lime-400" },
  { type: BehaviorType.ButtWiggle, title: "Butt Wiggles", cost: 7, color: "bg-teal-400" },
  { type: BehaviorType.SitStay, title: "Sit & Stay (30s)", cost: 8, color: "bg-orange-400" },
];

const App: React.FC = () => {
  const [treatCount, setTreatCount] = useState<number>(20);

  // Derived state for input validation. This creates a friendly error message if the input is invalid.
  const validationError = useMemo(() => {
    if (treatCount <= 0) {
      return "Please enter a number of treats greater than zero.";
    }
    if (treatCount > 200) {
      // This is a safeguard, as the input component also validates this.
      return "Pups can only have a maximum of 200 treats!";
    }
    return null;
  }, [treatCount]);

  // Calculates the required number of behaviors based on the treat count.
  const behaviors = useMemo(() => {
    if (validationError) return [];
    return BEHAVIORS_CONFIG.map(config => ({
      ...config,
      count: Math.ceil(treatCount / config.cost),
    }));
  }, [treatCount, validationError]);

  // Creates a fun, dynamic motivational message based on the two "hardest" tricks.
  const motivationalMessage = useMemo(() => {
    if (validationError || behaviors.length === 0) return "";
    const sortedBehaviors = [...behaviors].sort((a, b) => b.count - a.count);
    return `Those ${sortedBehaviors[0].count} ${sortedBehaviors[0].title.toLowerCase()} and ${sortedBehaviors[1].count} ${sortedBehaviors[1].title.toLowerCase()} will be paws-itively worth it!`;
  }, [behaviors, validationError]);

  return (
    <div className="min-h-screen bg-amber-50 from-amber-100 to-sky-100 bg-gradient-to-br flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      <main className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 space-y-8">
        <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 drop-shadow-sm">Pup's Treat Calculator</h1>
            <p className="text-slate-600 mt-2">Find out the "price" of today's snacks in cute currency!</p>
    <div className="mt-1 text-xs text-slate-400" aria-hidden="true" data-testid="fmt-main"
    >
      {formatCount(3, "treats")}
    <div className="mt-1 text-xs text-slate-400" aria-hidden="true" data-testid="fmt-badge">
      <Badge n={5} />  
    </div>
        </header>
        <section>
          <TreatInput value={treatCount} onChange={setTreatCount} />
        </section>

        {validationError ? (
          <div id="treat-error" role="alert" className="text-center p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg">
            {validationError}
          </div>
        ) : (
          <>
            <section>
              <h2 className="text-lg font-semibold text-slate-700 mb-4 text-center">Your pup needs to perform:</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {behaviors.map((b) => (
                   <BehaviorCard
                    key={b.type}
                    type={b.type}
                    title={b.title}
                    count={b.count}
                    color={b.color}
                    description={`For every ${b.cost} treats`}
                  />
                ))}
              </div>
            </section>

            <section className="bg-amber-100/50 p-4 rounded-lg border-l-4 border-amber-400">
                <h3 className="font-bold text-amber-800 flex items-center gap-2">
                  <PawPrintIcon className="w-5 h-5" />
                  A little motivation...
                </h3>
                <div className="text-amber-900 mt-2 min-h-[24px]">
                  <p>"{motivationalMessage}"</p>
                </div>
            </section>
          </>
        )}
      </main>
      <footer className="text-center mt-8 text-slate-500 text-sm">
        <p>Built with love for all the good pups in the world.</p>
      </footer>
    </div>
  );
};

export default App;
