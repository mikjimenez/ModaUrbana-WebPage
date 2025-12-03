import React from 'react';
import bannerHome from '../assets/ModaUrbanaSPA.jpg';


export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section - Imagen Full Width sin recorte */}
      <section className="w-full bg-black flex justify-center">
        <img
            src={bannerHome}
            alt="Moda Urbana"
            className="max-w-full h-auto"
            style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            display: 'block'
            }}
        />
       </section>
            
      {/* Sección Informativa */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">
            TU DISTRIBUIDORA DE CONFIANZA
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Traemos las mejores marcas y colecciones directamente para ti. 
            Calidad, estilo y las últimas tendencias en un solo lugar.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6">
              <div className="text-5xl mb-4">🚚</div>
              <h4 className="font-bold text-xl mb-2 text-black">Envío Rápido</h4>
              <p className="text-gray-600">Recibe tus productos en tiempo récord</p>
            </div>
            
            <div className="p-6">
              <div className="text-5xl mb-4">✓</div>
              <h4 className="font-bold text-xl mb-2 text-black">100% Original</h4>
              <p className="text-gray-600">Garantía de autenticidad en todos nuestros productos</p>
            </div>
            
            <div className="p-6">
              <div className="text-5xl mb-4">💳</div>
              <h4 className="font-bold text-xl mb-2 text-black">Pago Seguro</h4>
              <p className="text-gray-600">Múltiples métodos de pago disponibles</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">¿LISTO PARA RENOVAR TU ESTILO?</h2>
          <p className="text-lg mb-8 text-gray-300">
            Descubre nuestra colección completa y encuentra las piezas perfectas para ti
          </p>
          <button
            className="fw-bold mt-4 px-6 py-3 bg-black text-white rounded-md"
            style={{
                transition: 'all 0.3s ease',
                fontWeight: 'bold',
            }}
            onClick={() => window.location.href = '/productos'} 
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(240, 233, 233, 1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
            }}
            >
            Ver Catálogo Completo
            </button>
        </div>
      </section>
    </div>
  );
}
