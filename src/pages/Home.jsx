import { Navigation, Autoplay } from 'swiper/modules';
import SwiperCarrusel from '../components/SwiperCarrusel/SwiperCarrusel';
import Item from '../components/Item/Item';
import { useProducts } from '../hooks/useProducts'
import { Banners } from '../components/Banners';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

function Home() {

  const navigate = useNavigate();
  const { productos, cargando } = useProducts();
  const productosDestacados = productos.filter(p => p.esDestacado);
  const pcArmadas = productos.filter(p => p.categoriasIds.includes('pc-armadas'));

  // Ahora son rutas absolutas directas de la carpeta public
  const bannersSwiper = [
    { id: 'b1', desktop: '/images/banners/banner1-forge-tech.png', mobile: '/images/banners/banner1-forge-tech-mob.png' },
    { id: 'b2', desktop: '/images/banners/banner2-forge-tech.png', mobile: '/images/banners/banner2-forge-tech-mob.png' },
    { id: 'b3', desktop: '/images/banners/banner3-forge-tech.png', mobile: '/images/banners/banner3-forge-tech-mob.png' },
    { id: 'b4', desktop: '/images/banners/banner4-forge-tech.png', mobile: '/images/banners/banner4-forge-tech-mob.png' },
    { id: 'b5', desktop: '/images/banners/banner5-forge-tech.png', mobile: '/images/banners/banner5-forge-tech-mob.png' }
  ];

  const bannersPublicidadArma = [
    { id: 'bArma', desktop: '/images/banners/arma-tu-pc-desk.png', mobile: '/images/banners/arma-tu-pc-mob.png' }
  ];

  const bannersPublicidadElegi = [
    { id: 'bElegi', desktop: '/images/banners/elegi-tu-pc-desk.png', mobile: '/images/banners/elegi-tu-pc-mob.png' },
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
          <Loader />
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
            renderItem={(prod) => {
              const categoriaUrl = Array.isArray(prod.categoriasIds) && prod.categoriasIds.length > 0 && prod.categoriasIds[0]
                ? prod.categoriasIds[0]
                : "otros";

              return (
                <Item
                  id={prod.id}
                  nombre={prod.nombre}
                  imagenes={prod.imagenes}
                  precioLista={prod.precioLista}
                  verFichaTecnica={() => navigate(`/producto/${categoriaUrl}/${prod.id}`)}
                />
              );
            }}
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
          <Loader />
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
                  if (swiper.autoplay && typeof swiper.autoplay.start === 'function') {
                    swiper.autoplay.start();
                  }
                }, 1500);
              },
            }}
            renderItem={(prod) => {
              const categoriaUrl = Array.isArray(prod.categoriasIds) && prod.categoriasIds.length > 0 && prod.categoriasIds[0]
                ? prod.categoriasIds[0]
                : "otros";

              return (
                <Item
                  id={prod.id}
                  nombre={prod.nombre}
                  imagenes={prod.imagenes}
                  precioLista={prod.precioLista}
                  verFichaTecnica={() => navigate(`/producto/${categoriaUrl}/${prod.id}`)}
                />
              );
            }}
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