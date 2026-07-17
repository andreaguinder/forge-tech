import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css/bundle';
import { useId } from 'react';

const SwiperCarrusel = ({ items, renderItem, settings, containerClassName, showPagination = false, modules = [Navigation, Autoplay] }) => {

  const uniqueId = useId();
  const prevClass = `prev-${uniqueId.replace(/:/g, '')}`;
  const nextClass = `next-${uniqueId.replace(/:/g, '')}`;

  return (
    <div className={`swiper-main-container ${containerClassName || ''}`}>

      <div className={`swiper-button-prev-custom ${prevClass}`}>
        <ChevronLeft size={32} />
      </div>
      <Swiper
        className="carruselInterno"
        modules={modules}

        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        pagination={false}
        {...settings}


      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id || index}>
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={`swiper-button-next-custom ${nextClass}`}>
        <ChevronRight size={32} />
      </div>
    </div>
  );
};

export default SwiperCarrusel;