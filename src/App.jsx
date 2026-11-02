import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import FarmSection from './components/FarmSection.jsx';
import EggsSection from './components/EggsSection.jsx';
import InsideSection from './components/InsideSection.jsx';
import EscapeSection from './components/EscapeSection.jsx';
import CookingSection from './components/CookingSection.jsx';
import MorningsSection from './components/MorningsSection.jsx';
import ShopSection from './components/ShopSection.jsx';
import CareSection from './components/CareSection.jsx';
import Footer from './components/Footer.jsx';
import AnimationLayers from './components/AnimationLayers.jsx';
import Dialogs from './components/Dialogs.jsx';
import { useSceneAnimations } from './hooks/useSceneAnimations.js';

export default function App() {
  const root = useRef(null);
  const [colour, setColour] = useState('brown');
  const [selection, setSelection] = useState(null);
  const [tourOpen, setTourOpen] = useState(false);
  const openTour = useCallback(() => setTourOpen(true), []);
  const closeTour = useCallback(() => setTourOpen(false), []);
  const closeOrder = useCallback(() => setSelection(null), []);

  useSceneAnimations(root);
  useEffect(() => {
    root.current.querySelector('#care').dispatchEvent(new CustomEvent('care-colour', { detail: colour }));
  }, [colour]);

  return <div ref={root}>
    <Header />
    <main>
      <HeroSection />
      <FarmSection onOpenTour={openTour} />
      <EggsSection />
      <InsideSection />
      <EscapeSection />
      <CookingSection />
      <MorningsSection />
      <ShopSection colour={colour} onColourChange={setColour} onBuy={setSelection} />
      <CareSection colour={colour} onColourChange={setColour} />
    </main>
    <Footer onColourChange={setColour} />
    <AnimationLayers colour={colour} />
    <Dialogs selection={selection} onCloseOrder={closeOrder} tourOpen={tourOpen} onCloseTour={closeTour} />
  </div>;
}
