import { defineStore } from 'pinia'
// IMPORTS DE IMÁGENES PRODUCTOS
import Iphone13Pro1 from '@/assets/img/productsImage/Iphone13Pro1.jpg'
import Iphone13Pro2 from '@/assets/img/productsImage/Iphone13Pro2.jpg'
import Iphone13Pro3 from '@/assets/img/productsImage/Iphone13Pro3.jpg'
import MacBookAirM21 from '@/assets/img/productsImage/MacBookAirM21.jpg'
import MacBookAirM22 from '@/assets/img/productsImage/MacBookAirM22.jpg'
import MacBookAirM23 from '@/assets/img/productsImage/MacBookAirM23.jpg'
import SamsungGalaxyS221 from '@/assets/img/productsImage/SamsungGalaxyS221.webp'
import SamsungGalaxyS222 from '@/assets/img/productsImage/SamsungGalaxyS222webp.webp'
import SamsungGalaxyS223 from '@/assets/img/productsImage/SamsungGalaxyS223.webp'
import NintendoSwitchOLED1 from '@/assets/img/productsImage/NintendoSwitchOLED1.jpg'
import NintendoSwitchOLED2 from '@/assets/img/productsImage/NintendoSwitchOLED2.jpg'
import NintendoSwitchOLED3 from '@/assets/img/productsImage/NintendoSwitchOLED3.jpg'
import AuricularesSony1 from '@/assets/img/productsImage/Auriculares Sony WH-1000XM41.webp'
import AuricularesSony2 from '@/assets/img/productsImage/Auriculares Sony WH-1000XM42.webp'
import AuricularesSony3 from '@/assets/img/productsImage/Auriculares Sony WH-1000XM43.webp'
import SeatIbiza20161 from '@/assets/img/productsImage/SeatIbiza20161.webp'
import SeatIbiza20162 from '@/assets/img/productsImage/SeatIbiza20162.webp'
import SeatIbiza20163 from '@/assets/img/productsImage/SeatIbiza20163.webp'
import BicicletaurbanaOrbea1 from '@/assets/img/productsImage/BicicletaurbanaOrbea1.jpg'
import BicicletaurbanaOrbea2 from '@/assets/img/productsImage/BicicletaurbanaOrbea2.jpg'
import BicicletaurbanaOrbea3 from '@/assets/img/productsImage/BicicletaurbanaOrbea3.jpg'
import PatineteXiaomiPro21 from '@/assets/img/productsImage/PatineteXiaomiPro21.webp'
import PatineteXiaomiPro22 from '@/assets/img/productsImage/PatineteXiaomiPro22.webp'
import PatineteXiaomiPro23 from '@/assets/img/productsImage/PatineteXiaomiPro23.webp'
import MotoYamahaMT071 from '@/assets/img/productsImage/MotoYamahaMT-071.jpg'
import MotoYamahaMT072 from '@/assets/img/productsImage/MotoYamahaMT-072.jpg'
import MotoYamahaMT073 from '@/assets/img/productsImage/MotoYamahaMT-073.jpg'
import RenaultClio20181 from '@/assets/img/productsImage/RenaultClio20181.webp'
import RenaultClio20182 from '@/assets/img/productsImage/RenaultClio20182.webp'
import RenaultClio20183 from '@/assets/img/productsImage/RenaultClio20183.webp'
import Chaquetadecuero1 from '@/assets/img/productsImage/Chaquetadecuero1.jpg'
import Chaquetadecuero2 from '@/assets/img/productsImage/Chaquetadecuero2.jpg'
import Chaquetadecuero3 from '@/assets/img/productsImage/Chaquetadecuero3.jpg'
import ZapatillasNikeAirMax1 from '@/assets/img/productsImage/ZapatillasNikeAirMax1.webp'
import ZapatillasNikeAirMax2 from '@/assets/img/productsImage/ZapatillasNikeAirMax2.webp'
import ZapatillasNikeAirMax3 from '@/assets/img/productsImage/ZapatillasNikeAirMax3.webp'
import Bolsopielartesanal1 from '@/assets/img/productsImage/Bolsopielartesanal1.jpg'
import Bolsopielartesanal2 from '@/assets/img/productsImage/Bolsopielartesanal2.jpg'
import Bolsopielartesanal3 from '@/assets/img/productsImage/Bolsopielartesanal3.jpg'
import Abrigolanalargo1 from '@/assets/img/productsImage/Abrigolanalargo1.webp'
import Abrigolanalargo2 from '@/assets/img/productsImage/Abrigolanalargo2.webp'
import Abrigolanalargo3 from '@/assets/img/productsImage/Abrigolanalargo3.webp'
import Relojminimalista1 from '@/assets/img/productsImage/Relojminimalista1.jpg'
import Relojminimalista2 from '@/assets/img/productsImage/Relojminimalista2.jpg'
import Relojminimalista3 from '@/assets/img/productsImage/Relojminimalista3.jpg'
import Sofatresplazas1 from '@/assets/img/productsImage/Sofatresplazas1.webp'
import Sofatresplazas2 from '@/assets/img/productsImage/Sofatresplazas2.webp'
import Sofatresplazas3 from '@/assets/img/productsImage/Sofatresplazas3.webp'
import Mesacomedorextensible1 from '@/assets/img/productsImage/Mesacomedorextensible1.webp'
import Mesacomedorextensible2 from '@/assets/img/productsImage/Mesacomedorextensible2.webp'
import Mesacomedorextensible3 from '@/assets/img/productsImage/Mesacomedorextensible3.webp'
import Lamparadepienordica1 from '@/assets/img/productsImage/Lamparadepienordica1.webp'
import Lamparadepienordica2 from '@/assets/img/productsImage/Lamparadepienordica2.webp'
import Lamparadepienordica3 from '@/assets/img/productsImage/Lamparadepienordica3.webp'
import Cafeteraespresso1 from '@/assets/img/productsImage/Cafeteraespresso1.jpg'
import Cafeteraespresso2 from '@/assets/img/productsImage/Cafeteraespresso2.jpg'
import Cafeteraespresso3 from '@/assets/img/productsImage/Cafeteraespresso3.jpg'
import Setvajilla24piezas1 from '@/assets/img/productsImage/Setvajilla24piezas1.jpg'
import Setvajilla24piezas2 from '@/assets/img/productsImage/Setvajilla24piezas2.jpg'
import Setvajilla24piezas3 from '@/assets/img/productsImage/Setvajilla24piezas3.jpg'
import Bicicletademontaña1 from '@/assets/img/productsImage/Bicicletademontaña1.jpg'
import Bicicletademontaña2 from '@/assets/img/productsImage/Bicicletademontaña2.jpg'
import Bicicletademontaña3 from '@/assets/img/productsImage/Bicicletademontaña3.jpg'
import Setmancuernas20kg1 from '@/assets/img/productsImage/Setmancuernas20kg1.jpg'
import Setmancuernas20kg2 from '@/assets/img/productsImage/Setmancuernas20kg2.jpg'
import Setmancuernas20kg3 from '@/assets/img/productsImage/Setmancuernas20kg3.jpg'
import Tabladesurf641 from '@/assets/img/productsImage/Tabladesurf6.41.jpg'
import Tabladesurf642 from '@/assets/img/productsImage/Tabladesurf6.42.jpg'
import Tabladesurf643 from '@/assets/img/productsImage/Tabladesurf6.43.jpg'
import Raquetadetenis1 from '@/assets/img/productsImage/Raquetadetenis1.jpg'
import Raquetadetenis2 from '@/assets/img/productsImage/Raquetadetenis2.jpg'
import Raquetadetenis3 from '@/assets/img/productsImage/Raquetadetenis3.jpg'
import Cascociclismo1 from '@/assets/img/productsImage/Cascociclismo1.jpg'
import Cascociclismo2 from '@/assets/img/productsImage/Cascociclismo2.jpg'
import Cascociclismo3 from '@/assets/img/productsImage/Cascociclismo3.jpg'
import Sillaergonomica1 from '@/assets/img/productsImage/Sillaergonomica1.jpg'
import Sillaergonomica2 from '@/assets/img/productsImage/Sillaergonomica2.jpg'
import Sillaergonomica3 from '@/assets/img/productsImage/Sillaergonomica3.jpg'
import Monitor27pulgadas1 from '@/assets/img/productsImage/Monitor27pulgadas1.webp'
import Monitor27pulgadas2 from '@/assets/img/productsImage/Monitor27pulgadas2.webp'
import Monitor27pulgadas3 from '@/assets/img/productsImage/Monitor27pulgadas3.webp'
import Tecladomecanico1 from '@/assets/img/productsImage/Tecladomecanico1.webp'
import Tecladomecanico2 from '@/assets/img/productsImage/Tecladomecanico2.webp'
import Tecladomecanico3 from '@/assets/img/productsImage/Tecladomecanico3.webp'
import Escritorioelevable1 from '@/assets/img/productsImage/Escritorioelevable1.webp'
import Escritorioelevable2 from '@/assets/img/productsImage/Escritorioelevable2.webp'
import Escritorioelevable3 from '@/assets/img/productsImage/Escritorioelevable3.webp'
import Impresoralaser1 from '@/assets/img/productsImage/Impresoralaser1.webp'
import Impresoralaser2 from '@/assets/img/productsImage/Impresoralaser2.webp'
import Impresoralaser3 from '@/assets/img/productsImage/Impresoralaser3.webp'
import Guitarraacustica1 from '@/assets/img/productsImage/Guitarraacustica1.webp'
import Guitarraacustica2 from '@/assets/img/productsImage/Guitarraacustica2.webp'
import Guitarraacustica3 from '@/assets/img/productsImage/Guitarraacustica3.webp'
import ProfileSeller from '@/assets/img/profilesSellers/profileSeller1.jpg'
import { ref, computed } from 'vue'

interface Product {
  id: number
  title: string
  price: number
  image: string
  category: string
  seller: string
  sellerEmail?: string
  sellerAvatar?: string
  sellerId: number
  condition: string
  location: string
  createdAt: Date
  isFavorite: boolean
  description: string
  images: string[]
  brand?: string
}

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([
    {
      id: 1,
      title: 'iPhone 13 Pro',
      price: 450,
      image: Iphone13Pro1,
      category: 'Electrónica',
      seller: 'Juan Pérez',
      sellerEmail: 'juan.perez@example.com',
      sellerId: 1,
      condition: 'Usado - Buen estado',
      location: 'Madrid',
      createdAt: new Date('2024-01-15'),
      isFavorite: false,
      description: 'iPhone 13 Pro en excelente estado',
      images: [Iphone13Pro1, Iphone13Pro2, Iphone13Pro3],
      brand: 'apple',
      sellerAvatar: ProfileSeller,
    },
    {
      id: 2,
      title: 'MacBook Air M2',
      price: 800,
      image: MacBookAirM21,
      category: 'Electrónica',
      seller: 'María García',
      sellerEmail: 'maria.garcia@example.com',
      sellerId: 2,
      condition: 'Nuevo',
      location: 'Barcelona',
      createdAt: new Date('2024-01-10'),
      isFavorite: false,
      description: 'MacBook Air M2 sin usar',
      images: [MacBookAirM21, MacBookAirM22, MacBookAirM23],
      brand: 'apple',
      sellerAvatar: './assets/img/profilesSellers/profileSeller2.jpg',
    },
    {
      id: 3,
      title: 'Samsung Galaxy S22',
      price: 380,
      image: SamsungGalaxyS221,
      category: 'Electrónica',
      seller: 'Lucia Ortiz',
      sellerEmail: 'lucia.ortiz@example.com',
      sellerId: 3,
      condition: 'Usado - Buen estado',
      location: 'Valencia',
      createdAt: new Date('2024-02-03'),
      isFavorite: false,
      description: 'Galaxy S22 con caja y cargador.',
      images: [SamsungGalaxyS221, SamsungGalaxyS222, SamsungGalaxyS223],
      brand: 'samsung',
      sellerAvatar: './assets/img/profilesSellers/profileSeller3.jpg',
    },
    {
      id: 4,
      title: 'Nintendo Switch OLED',
      price: 260,
      image: NintendoSwitchOLED1,
      category: 'Electrónica',
      seller: 'Diego Mora',
      sellerEmail: 'diego.mora@example.com',
      sellerId: 4,
      condition: 'Usado - Como nuevo',
      location: 'Sevilla',
      createdAt: new Date('2024-02-08'),
      isFavorite: false,
      description: 'Con funda y dos mandos extra.',
      images: [NintendoSwitchOLED1, NintendoSwitchOLED2, NintendoSwitchOLED3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller4.jpg',
    },
    {
      id: 5,
      title: 'Auriculares Sony WH-1000XM4',
      price: 170,
      image: AuricularesSony1,
      category: 'Electrónica',
      seller: 'Paula Rey',
      sellerEmail: 'paula.rey@example.com',
      sellerId: 5,
      condition: 'Usado - Buen estado',
      location: 'Bilbao',
      createdAt: new Date('2024-02-11'),
      isFavorite: false,
      description: 'Cancelacion de ruido y estuche.',
      images: [AuricularesSony1, AuricularesSony2, AuricularesSony3],
      brand: 'sony',
      sellerAvatar: './assets/img/profilesSellers/profileSeller5.jpg',
    },
    {
      id: 6,
      title: 'Seat Ibiza 2016',
      price: 7200,
      image: SeatIbiza20161,
      category: 'Vehículos',
      seller: 'Roberto Diaz',
      sellerEmail: 'roberto.diaz@example.com',
      sellerId: 6,
      condition: 'Usado - Buen estado',
      location: 'Zaragoza',
      createdAt: new Date('2024-02-01'),
      isFavorite: false,
      description: 'ITV al dia, 120.000 km.',
      images: [SeatIbiza20161, SeatIbiza20162, SeatIbiza20163],
      brand: 'seat',
      sellerAvatar: './assets/img/profilesSellers/profileSeller6.jpg',
    },
    {
      id: 7,
      title: 'Bicicleta urbana Orbea',
      price: 290,
      image: BicicletaurbanaOrbea1,
      category: 'Vehículos',
      seller: 'Sara Gil',
      sellerEmail: 'sara.gil@example.com',
      sellerId: 7,
      condition: 'Usado - Buen estado',
      location: 'Malaga',
      createdAt: new Date('2024-02-05'),
      isFavorite: false,
      description: 'Ideal ciudad, frenos revisados.',
      images: [BicicletaurbanaOrbea1, BicicletaurbanaOrbea2, BicicletaurbanaOrbea3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller7.jpg',
    },
    {
      id: 8,
      title: 'Patinete Xiaomi Pro 2',
      price: 320,
      image: PatineteXiaomiPro21,
      category: 'Vehículos',
      seller: 'Ivan Soto',
      sellerEmail: 'ivan.soto@example.com',
      sellerId: 8,
      condition: 'Usado - Como nuevo',
      location: 'Granada',
      createdAt: new Date('2024-02-07'),
      isFavorite: false,
      description: 'Bateria con buena autonomia.',
      images: [PatineteXiaomiPro21, PatineteXiaomiPro22, PatineteXiaomiPro23],
      sellerAvatar: './assets/img/profilesSellers/profileSeller8.jpg',
    },
    {
      id: 9,
      title: 'Moto Yamaha MT-07',
      price: 5200,
      image: MotoYamahaMT071,
      category: 'Vehículos',
      seller: 'Nerea Vidal',
      sellerEmail: 'nerea.vidal@example.com',
      sellerId: 9,
      condition: 'Usado - Buen estado',
      location: 'Alicante',
      createdAt: new Date('2024-02-09'),
      isFavorite: false,
      description: 'Revision reciente y neumáticos nuevos.',
      images: [MotoYamahaMT071, MotoYamahaMT072, MotoYamahaMT073],
      sellerAvatar: './assets/img/profilesSellers/profileSeller9.jpg',
    },
    {
      id: 10,
      title: 'Renault Clio 2018',
      price: 8900,
      image: RenaultClio20181,
      category: 'Vehículos',
      seller: 'Adrian Torres',
      sellerEmail: 'adrian.torres@example.com',
      sellerId: 10,
      condition: 'Usado - Como nuevo',
      location: 'Valladolid',
      createdAt: new Date('2024-02-12'),
      isFavorite: false,
      description: 'Un solo dueño, historial completo.',
      images: [RenaultClio20181, RenaultClio20182, RenaultClio20183],
      sellerAvatar: './assets/img/profilesSellers/profileSeller10.jpg',
      
    },
    {
      id: 11,
      title: 'Chaqueta de cuero',
      price: 95,
      image: Chaquetadecuero1,
      category: 'Moda',
      seller: 'Claudia Ramos',
      sellerEmail: 'claudia.ramos@example.com',
      sellerId: 11,
      condition: 'Usado - Buen estado',
      location: 'Madrid',
      createdAt: new Date('2024-02-02'),
      isFavorite: false,
      description: 'Talla M, poco uso.',
      images: [Chaquetadecuero1, Chaquetadecuero2, Chaquetadecuero3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller11.jpg',
    },
    {
      id: 12,
      title: 'Zapatillas Nike Air Max',
      price: 70,
      image: ZapatillasNikeAirMax1,
      category: 'Moda',
      seller: 'Andrea Cruz',
      sellerEmail: 'andrea.cruz@example.com',
      sellerId: 12,
      condition: 'Usado - Buen estado',
      location: 'Cordoba',
      createdAt: new Date('2024-02-04'),
      isFavorite: false,
      description: 'Talla 42, con caja.',
      images: [ZapatillasNikeAirMax1, ZapatillasNikeAirMax2, ZapatillasNikeAirMax3],
      brand: 'nike',
      sellerAvatar: './assets/img/profilesSellers/profileSeller12.jpg',
    },
    {
      id: 13,
      title: 'Bolso piel artesanal',
      price: 120,
      image: Bolsopielartesanal1,
      category: 'Moda',
      seller: 'Veronica Pardo',
      sellerEmail: 'veronica.pardo@example.com',
      sellerId: 13,
      condition: 'Nuevo',
      location: 'Santander',
      createdAt: new Date('2024-02-06'),
      isFavorite: false,
      description: 'Cuero natural, acabado premium.',
      images: [Bolsopielartesanal1, Bolsopielartesanal2, Bolsopielartesanal3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller13.jpg',
    },
    {
      id: 14,
      title: 'Abrigo lana largo',
      price: 85,
      image: Abrigolanalargo1,
      category: 'Moda',
      seller: 'Elena Marcos',
      sellerEmail: 'elena.marcos@example.com',
      sellerId: 14,
      condition: 'Usado - Como nuevo',
      location: 'Gijon',
      createdAt: new Date('2024-02-08'),
      isFavorite: false,
      description: 'Talla S, ideal invierno.',
      images: [Abrigolanalargo1, Abrigolanalargo2, Abrigolanalargo3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller14.jpg',
    },
    {
      id: 15,
      title: 'Reloj minimalista',
      price: 60,
      image: Relojminimalista1,
      category: 'Moda',
      seller: 'Mario Cano',
      sellerEmail: 'mario.cano@example.com',
      sellerId: 15,
      condition: 'Usado - Buen estado',
      location: 'Pamplona',
      createdAt: new Date('2024-02-10'),
      isFavorite: false,
      description: 'Correa intercambiable.',
      images: [Relojminimalista1, Relojminimalista2, Relojminimalista3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller15.jpg',
    },
    {
      id: 16,
      title: 'Sofa tres plazas',
      price: 350,
      image: Sofatresplazas1,
      category: 'Hogar',
      seller: 'Raquel Sanz',
      sellerEmail: 'raquel.sanz@example.com',
      sellerId: 16,
      condition: 'Usado - Buen estado',
      location: 'Murcia',
      createdAt: new Date('2024-02-03'),
      isFavorite: false,
      description: 'Tapizado limpio y sin manchas.',
      images: [Sofatresplazas1, Sofatresplazas2, Sofatresplazas3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller16.jpg',
    },
    {
      id: 17,
      title: 'Mesa comedor extensible',
      price: 210,
      image: Mesacomedorextensible1,
      category: 'Hogar',
      seller: 'Oscar Glez',
      sellerEmail: 'oscar.glez@example.com',
      sellerId: 17,
      condition: 'Usado - Buen estado',
      location: 'Salamanca',
      createdAt: new Date('2024-02-05'),
      isFavorite: false,
      description: 'Madera maciza, incluye 6 sillas.',
      images: [Mesacomedorextensible1, Mesacomedorextensible2, Mesacomedorextensible3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller17.jpg',
    },
    {
      id: 18,
      title: 'Lampara de pie nordica',
      price: 55,
      image: Lamparadepienordica1,
      category: 'Hogar',
      seller: 'Diana Ramos',
      sellerEmail: 'diana.ramos@example.com',
      sellerId: 18,
      condition: 'Nuevo',
      location: 'A Coruna',
      createdAt: new Date('2024-02-06'),
      isFavorite: false,
      description: 'Acabado metalico, luz calida.',
      images: [Lamparadepienordica1, Lamparadepienordica2, Lamparadepienordica3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller18.jpg',
    },
    {
      id: 19,
      title: 'Cafetera espresso',
      price: 75,
      image: Cafeteraespresso1,
      category: 'Hogar',
      seller: 'Tomas Rios',
      sellerEmail: 'tomas.rios@example.com',
      sellerId: 19,
      condition: 'Usado - Buen estado',
      location: 'Logrono',
      createdAt: new Date('2024-02-08'),
      isFavorite: false,
      description: 'Incluye accesorios y manual.',
      images: [Cafeteraespresso1, Cafeteraespresso2, Cafeteraespresso3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller19.jpg',
    },
    {
      id: 20,
      title: 'Set vajilla 24 piezas',
      price: 40,
      image: Setvajilla24piezas1,
      category: 'Hogar',
      seller: 'Marta Alonso',
      sellerEmail: 'marta.alonso@example.com',
      sellerId: 20,
      condition: 'Usado - Buen estado',
      location: 'Toledo',
      createdAt: new Date('2024-02-10'),
      isFavorite: false,
      description: 'Porcelana blanca, sin roturas.',
      images: [Setvajilla24piezas1, Setvajilla24piezas2, Setvajilla24piezas3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller20.jpg',
    },
    {
      id: 21,
      title: 'Bicicleta de montaña',
      price: 420,
      image: Bicicletademontaña1,
      category: 'Deportes',
      seller: 'Hugo Martin',
      sellerEmail: 'hugo.martin@example.com',
      sellerId: 21,
      condition: 'Usado - Buen estado',
      location: 'Oviedo',
      createdAt: new Date('2024-02-02'),
      isFavorite: false,
      description: 'Suspension delantera y frenos disco.',
      images: [Bicicletademontaña1, Bicicletademontaña2, Bicicletademontaña3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller21.jpg',
    },
    {
      id: 22,
      title: 'Set mancuernas 20kg',
      price: 45,
      image: Setmancuernas20kg1,
      category: 'Deportes',
      seller: 'David Lago',
      sellerEmail: 'david.lago@example.com',
      sellerId: 22,
      condition: 'Usado - Buen estado',
      location: 'Burgos',
      createdAt: new Date('2024-02-04'),
      isFavorite: false,
      description: 'Incluye barras y discos.',
      images: [Setmancuernas20kg1, Setmancuernas20kg2, Setmancuernas20kg3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller22.jpg',
    },
    {
      id: 23,
      title: 'Tabla de surf 6.4',
      price: 260,
      image: Tabladesurf641,
      category: 'Deportes',
      seller: 'Pablo Costa',
      sellerEmail: 'pablo.costa@example.com',
      sellerId: 23,
      condition: 'Usado - Buen estado',
      location: 'Cadiz',
      createdAt: new Date('2024-02-06'),
      isFavorite: false,
      description: 'Incluye funda y leash.',
      images: [Tabladesurf641, Tabladesurf642, Tabladesurf643],
      sellerAvatar: './assets/img/profilesSellers/profileSeller23.jpg',
    },
    {
      id: 24,
      title: 'Raqueta de tenis',
      price: 90,
      image: Raquetadetenis1,
      category: 'Deportes',
      seller: 'Cristina Mora',
      sellerEmail: 'cristina.mora@example.com',
      sellerId: 24,
      condition: 'Usado - Como nuevo',
      location: 'San Sebastian',
      createdAt: new Date('2024-02-08'),
      isFavorite: false,
      description: 'Wilson Pro Staff, encordada.',
      images: [Raquetadetenis1, Raquetadetenis2, Raquetadetenis3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller24.jpg',
    },
    {
      id: 25,
      title: 'Casco ciclismo',
      price: 35,
      image: Cascociclismo1,
      category: 'Deportes',
      seller: 'Alba Lozano',
      sellerEmail: 'alba.lozano@example.com',
      sellerId: 25,
      condition: 'Nuevo',
      location: 'Tarragona',
      createdAt: new Date('2024-02-11'),
      isFavorite: false,
      description: 'Talla M, ventilado.',
      images: [Cascociclismo1, Cascociclismo2, Cascociclismo3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller25.jpg',
    },
    {
      id: 26,
      title: 'Silla ergonomica',
      price: 140,
      image: Sillaergonomica1,
      category: 'Oficina',
      seller: 'Jose Molina',
      sellerEmail: 'jose.molina@example.com',
      sellerId: 26,
      condition: 'Usado - Buen estado',
      location: 'Madrid',
      createdAt: new Date('2024-02-01'),
      isFavorite: false,
      description: 'Soporte lumbar ajustable.',
      images: [Sillaergonomica1, Sillaergonomica2, Sillaergonomica3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller26.jpg',
    },
    {
      id: 27,
      title: 'Monitor 27 pulgadas',
      price: 160,
      image: Monitor27pulgadas1,
      category: 'Oficina',
      seller: 'Sonia Perez',
      sellerEmail: 'sonia.perez@example.com',
      sellerId: 27,
      condition: 'Usado - Buen estado',
      location: 'Barcelona',
      createdAt: new Date('2024-02-03'),
      isFavorite: false,
      description: 'Full HD, panel IPS.',
      images: [Monitor27pulgadas1, Monitor27pulgadas2, Monitor27pulgadas3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller27.jpg',
    },
    {
      id: 28,
      title: 'Teclado mecanico',
      price: 65,
      image: Tecladomecanico1,
      category: 'Oficina',
      seller: 'Bruno Diaz',
      sellerEmail: 'bruno.diaz@example.com',
      sellerId: 28,
      condition: 'Usado - Buen estado',
      location: 'Valencia',
      createdAt: new Date('2024-02-06'),
      isFavorite: false,
      description: 'Switches rojos, retroiluminado.',
      images: [Tecladomecanico1, Tecladomecanico2, Tecladomecanico3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller28.jpg',
    },
    {
      id: 29,
      title: 'Escritorio elevable',
      price: 220,
      image: Escritorioelevable1,
      category: 'Oficina',
      seller: 'Noelia Ruiz',
      sellerEmail: 'noelia.ruiz@example.com',
      sellerId: 29,
      condition: 'Usado - Buen estado',
      location: 'Sevilla',
      createdAt: new Date('2024-02-08'),
      isFavorite: false,
      description: 'Altura regulable, 120x60.',
      images: [Escritorioelevable1, Escritorioelevable2, Escritorioelevable3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller29.jpg',
    },
    {
      id: 30,
      title: 'Impresora laser',
      price: 85,
      image: Impresoralaser1,
      category: 'Oficina',
      seller: 'Ismael Leon',
      sellerEmail: 'ismael.leon@example.com',
      sellerId: 30,
      condition: 'Usado - Buen estado',
      location: 'Castellon',
      createdAt: new Date('2024-02-12'),
      isFavorite: false,
      description: 'Incluye toner extra.',
      images: [Impresoralaser1, Impresoralaser2, Impresoralaser3],
      sellerAvatar: './assets/img/profilesSellers/profileSeller30.jpg',
    },
    {
      id: 31,
      title: 'Guitarra acustica',
      price: 150,
      image: Guitarraacustica1,
      category: 'Musica',
      seller: 'Manuel Herrera',
      sellerEmail: 'manuel.herrera@example.com',
      sellerAvatar: './assets/img/profilesSellers/profileSeller31.jpg',
      sellerId: 31,
      condition: 'Usado - Buen estado',
      location: 'Cordoba',
      createdAt: new Date('2024-02-04'),
      isFavorite: false,
      description: 'Yamaha F310, con funda.',
      images: [Guitarraacustica1, Guitarraacustica2, Guitarraacustica3],
    }
  ])

  const favorites = ref<number[]>([])
  const searchQuery = ref<string>('')
  const selectedCategories = ref<string>('')

  const filteredProducts = computed(() => {
    return products.value.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
      const matchesCategories =
        !selectedCategories.value || product.category === selectedCategories.value
      return matchesSearch && matchesCategories
    })
  })

  const getProductById = (id: string | number): Product | undefined => {
    return products.value.find((p) => p.id === Number(id))
  }

  const toggleFavorite = (productId: number): void => {
    const product = products.value.find((p) => p.id === productId)
    if (product) {
      product.isFavorite = !product.isFavorite
      if (product.isFavorite) {
        favorites.value.push(productId)
      } else {
        favorites.value = favorites.value.filter((id) => id !== productId)
      }
    }
  }

  const addProduct = (newProduct: Omit<Product, 'id' | 'isFavorite' | 'createdAt'>): void => {
    const id = Math.max(...products.value.map((p) => p.id), 0) + 1
    products.value.push({
      id,
      ...newProduct,
      isFavorite: false,
      createdAt: new Date(),
    })
  }

  return {
    products,
    favorites,
    searchQuery,
    selectedCategories,
    filteredProducts,
    getProductById,
    toggleFavorite,
    addProduct,
  }
})
