import { Navigation, Autoplay } from 'swiper/modules';
import SwiperCarrusel from '../components/SwiperCarrusel/SwiperCarrusel';
import Card from '../components/Cards/Card';
import { useProducts } from '../hooks/useProducts'
import { Banners } from '../components/Banners';

//Banners swiper
import banner1Desktop from '../assets/images/banners/banner1-forge-tech.png';
import banner2Desktop from '../assets/images/banners/banner2-forge-tech.png';
import banner3Desktop from '../assets/images/banners/banner3-forge-tech.png';
import banner4Desktop from '../assets/images/banners/banner4-forge-tech.png';
import banner5Desktop from '../assets/images/banners/banner5-forge-tech.png';

import banner1Mobile from '../assets/images/banners/banner1-forge-tech-mob.png';
import banner2Mobile from '../assets/images/banners/banner2-forge-tech-mob.png';
import banner3Mobile from '../assets/images/banners/banner3-forge-tech-mob.png';
import banner4Mobile from '../assets/images/banners/banner4-forge-tech-mob.png';
import banner5Mobile from '../assets/images/banners/banner5-forge-tech-mob.png';

// Banners publicitarios
import bannerElegiDesk from '../assets/images/banners/elegi-tu-pc-desk.png';
import bannerArmaDesk from '../assets/images/banners/arma-tu-pc-desk.png';

import bannerElegiMob from '../assets/images/banners/elegi-tu-pc-mob.png';
import bannerArmaMob from '../assets/images/banners/arma-tu-pc-mob.png';

import  Loader  from '../components/Loader/Loader';

function Home() {

  const { productos, cargando } = useProducts();
  const productosDestacados = productos.filter(p => p.esDestacado);
  const pcArmadas = productos.filter(p => p.categoriasIds.includes('cat-pc-armadas'));


  const bannersSwiper = [
    { id: 'b1', desktop: banner1Desktop, mobile: banner1Mobile },
    { id: 'b2', desktop: banner2Desktop, mobile: banner2Mobile },
    { id: 'b3', desktop: banner3Desktop, mobile: banner3Mobile },
    { id: 'b4', desktop: banner4Desktop, mobile: banner4Mobile },
    { id: 'b5', desktop: banner5Desktop, mobile: banner5Mobile }
  ];

  const bannersPublicidadArma = [
    { id: 'bArma', desktop: bannerArmaDesk, mobile: bannerArmaMob }
  ];

  const bannersPublicidadElegi = [
    { id: 'bElegi', desktop: bannerElegiDesk, mobile: bannerElegiMob },
  ];


  return (
    <main>
      {/* Carrusel de Banners */}
      <section>
        <SwiperCarrusel
          containerClassName="carruselBanners"
          items={bannersSwiper}
          modules={[Autoplay]}
          settings={{ autoplay: { delay: 3500 }, loop: true }}
          renderItem={(banner) => (
            <picture>
              <source media="(max-width: 767px)" srcSet={banner.mobile} />
              <img src={banner.desktop} alt="Banner" className='banner' />
            </picture>
          )}
        />
      </section>

      {/* Carrusel de Destacados */}
      <section className='productosEnCarrusel'>
        <h2 className='titleCarrusel'>Productos Destacados</h2>

        {cargando ? (
          <Loader/>

        ) : (
          <SwiperCarrusel
            containerClassName="carruselProductos"
            modules={[Navigation, Autoplay]}
            items={productosDestacados}
            settings={{
              spaceBetween: 24,
              breakpoints: { 768: { slidesPerView: 5 } },
              autoplay: { delay: 4000 },
              loop: true,
              style: {
                maxWidth: '1140px',
                width: '100%',
                overflow: 'hidden',
                padding: "20px 5px"
              },
            }}
            renderItem={(prod) => (
              <Card
                id={prod.id}
                nombre={prod.nombre}
                imagenes={prod.imagenes}
                precioLista={prod.precioLista}
              />
            )}
          />)}
      </section>

      {/* Banner publi PC Armadas */}

      <section>
        <Banners
          containerClassName="bannerPublicitario"
          items={bannersPublicidadElegi}
          renderItem={(banner) => (
            <picture>
              <source media="(max-width: 767px)" srcSet={banner.mobile} />
              <img src={banner.desktop} alt="Banner" className='banner' />
            </picture>
          )}
        />
      </section>



      {/* Carrusel de PC Armadas */}
      <section className='productosEnCarrusel'>
        <h2 className='titleCarrusel'>PC armadas</h2>

        {cargando ? (
                    <Loader/>

        ) : (

          <SwiperCarrusel
            containerClassName="carruselProductos"
            modules={[Navigation, Autoplay]}
            items={pcArmadas}
            settings={{
              spaceBetween: 24,
              breakpoints: { 768: { slidesPerView: 5 } },
              autoplay: { delay: 4000 },
              loop: true,
              style: {
                maxWidth: '1140px',
                width: '100%',
                overflow: 'hidden',
                padding: "20px 5px"
              },
onInit: (swiper) => {
  setTimeout(() => {
    // Verificamos que swiper.autoplay exista
    if (swiper.autoplay && typeof swiper.autoplay.start === 'function') {
      swiper.autoplay.start();
    }
  }, 1500);
},
            }}
            renderItem={(prod) => (
              <Card
                id={prod.id}
                nombre={prod.nombre}
                imagenes={prod.imagenes}
                precioLista={prod.precioLista}
              />
            )}
          />)}
      </section>



      {/* Banner publi Arma tu pc */}

      <section>
        <Banners
          containerClassName="bannerPublicitario"
          items={bannersPublicidadArma}
          renderItem={(banner) => (
            <picture>
              <source media="(max-width: 767px)" srcSet={banner.mobile} />
              <img src={banner.desktop} alt="Banner" className='banner' />
            </picture>
          )}
        />
      </section>



    </main>
  );
};

export default Home;