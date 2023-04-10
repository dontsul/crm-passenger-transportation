import { useEffect } from 'react';
import Bootstrap, { Carousel, BImg } from 'bootstrap-4-react';
import bus1 from '../../assets/image/bus1.jpg';
import bus2 from '../../assets/image/bus2.jpg';
import bus3 from '../../assets/image/bus3.jpg';

const first_src = bus1;
const second_src = bus2;
const third_src = bus3;

export const CarouselEl = () => {
  useEffect(() => {
    window.setTimeout(
      () => Bootstrap.carousel('#carouselExampleControls'),
      2000
    );
  }, []);

  return (
    <Carousel w="100" id="carouselExampleControls">
      <Carousel.Inner>
        <Carousel.Item active>
          <BImg display="block" w="100" src={first_src} />
        </Carousel.Item>
        <Carousel.Item>
          <BImg display="block" w="100" src={second_src} />
        </Carousel.Item>
        <Carousel.Item>
          <BImg display="block" w="100" src={third_src} />
        </Carousel.Item>
      </Carousel.Inner>
      <Carousel.Prev href="#carouselExampleControls">
        <Carousel.Prev.Icon />
      </Carousel.Prev>
      <Carousel.Next href="#carouselExampleControls">
        <Carousel.Next.Icon />
      </Carousel.Next>
    </Carousel>
  );
};
