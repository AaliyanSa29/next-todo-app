import React from "react";
import Header from "../components/Homepage/Header";
import Footer from "../components/Homepage/Footer";
import BusinessFlyers from "../ProductTypes/BusinessFlyers/BusinessFlyers";
import CardsAndDesign from "../ProductTypes/CardsAndDesign/CardsAndDesign";
import PowerPointDesignSection from "../ProductTypes/PowerPoint/PowerPoints";

export default function page() {
  return (
    <div>
      <Header />
      <section>
        <BusinessFlyers />
      </section>
      <section>
        <CardsAndDesign />
      </section>
      <section>
        <PowerPointDesignSection />
      </section>
      <Footer />
    </div>
  );
}
