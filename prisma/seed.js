import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
  
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  
  const am4 = await prisma.socket.upsert({
    where: { nome: 'AM4' },
    update: {},
    create: { nome: 'AM4' },
  });

  const am5 = await prisma.socket.upsert({
    where: { nome: 'AM5' },
    update: {},
    create: { nome: 'AM5' },
  });

  const lga1700 = await prisma.socket.upsert({
  where: { nome: 'LGA1700' },
  update: {},
  create: { nome: 'LGA1700' },
});
  const lga1851 = await prisma.socket.upsert({
  where: { nome: 'LGA1851' },
  update: {},
  create: { nome: 'LGA1851' },
});

const socketMap = {
    AM4: am4.id,
    AM5: am5.id, 
    LGA1700: lga1700.id, 
    LGA1851: lga1851.id,
  };

  
  const cpusRyzen5 = [
    { nome: 'Ryzen 5 5500', socket: 'AM4', preco: 544.90, wtts: 65, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen5AM4.webp'},
    { nome: 'Ryzen 5 5600GT', socket: 'AM4', preco: 989.00, wtts: 65, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen5AM4.webp'},
    { nome: 'Ryzen 5 7600X', socket: 'AM5', preco: 999.99, wtts: 105, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen5AM5.webp'},
    { nome: 'Ryzen 5 5600XT', socket: 'AM4', preco: 1299.99, wtts: 65, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen5AM4.webp'},
    { nome: 'Ryzen 5 4500', socket: 'AM4', preco: 580.16, wtts: 65, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen5AM4.webp'},
    { nome: 'Ryzen 5 7600', socket: 'AM5', preco: 1676.90, wtts: 65, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen5AM5.webp'},
    { nome: 'Ryzen 5 8600G', socket: 'AM5', preco: 1316.60, wtts: 65, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen5AM5G.webp'},
    { nome: 'Ryzen 5 8500G', socket: 'AM5', preco: 799.00, wtts: 65, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen5AM5G.webp'},
    { nome: 'Ryzen 5 9600X', socket: 'AM5', preco: 1666.22, wtts: 65, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen5AM5.webp'},
  ];
const cpusRyzen9 = [
  { nome: 'Ryzen 9 7900X', socket: 'AM5', preco: 1899.99, wtts: 170, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen97000.webp' },
  { nome: 'Ryzen 9 9950X3D', socket: 'AM5', preco: 4199.99, wtts: 170, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen99000.webp' },
  { nome: 'Ryzen 9 9900X3D', socket: 'AM5', preco: 3599.99, wtts: 120, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen99000.webp' },
  { nome: 'Ryzen 9 7950X3D', socket: 'AM5', preco: 4242.03, wtts: 120, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen97000.webp' },
  { nome: 'Ryzen 9 9900X', socket: 'AM5', preco: 3660.90, wtts: 120, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen99000.webp' },
  { nome: 'Ryzen 9 5900XT', socket: 'AM4', preco: 2710.90, wtts: 105, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen95000.webp' },
  { nome: 'Ryzen 9 9950X', socket: 'AM5', preco: 4499.63, wtts: 170, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen99000.webp' },
]; 

const cpusRyzen7 = [
  { nome: 'Ryzen 7 5700G', socket: 'AM4', preco: 1199.99, wtts: 65, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen75000.webp' },
  { nome: 'Ryzen 7 7700X', socket: 'AM5', preco: 1519.99, wtts: 105, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen77000.webp' },
  { nome: 'Ryzen 7 8700G', socket: 'AM5', preco: 1599.99, wtts: 65, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen7800.webp' },
  { nome: 'Ryzen 7 7800X3D', socket: 'AM5', preco: 1989.90, wtts: 120, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen77000.webp' },
  { nome: 'Ryzen 7 9700X', socket: 'AM5', preco: 3571.24, wtts: 65, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen79000.webp' },
  { nome: 'Ryzen 7 5700', socket: 'AM4', preco: 849.99, wtts: 65, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen75000.webp' },
  { nome: 'Ryzen 7 5700X', socket: 'AM4', preco: 1299.99, wtts: 65, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen75000.webp' },
  { nome: 'Ryzen 7 5800XT', socket: 'AM4', preco: 1599.99, wtts: 105, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/ryzen75000.webp' },
];

const cpusIntel = [
  { nome: 'Core i3-12100F', socket: 'LGA1700', preco: 599.99, wtts: 58, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i5-12400F', socket: 'LGA1700', preco: 915.37, wtts: 65, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i5-14400F', socket: 'LGA1700', preco: 1214.18, wtts: 65, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i5-14600K', socket: 'LGA1700', preco: 1799.99, wtts: 125, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i5-12400', socket: 'LGA1700', preco: 1523.92, wtts: 65, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i5-12600K', socket: 'LGA1700', preco: 2693.25, wtts: 125, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i5-12600KF', socket: 'LGA1700', preco: 1359.57, wtts: 125, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i5-14400', socket: 'LGA1700', preco: 1499, wtts: 65, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core Ultra 7 265K', socket: 'LGA1851', preco: 2299.99, wtts: 125, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core Ultra 7 265KF', socket: 'LGA1851', preco: 1999.99, wtts: 125, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core Ultra 9 285K', socket: 'LGA1851', preco: 3999.99, wtts: 125, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core Ultra 9 285', socket: 'LGA1851', preco: 2999.99, wtts: 65, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i5-14600KF', socket: 'LGA1700', preco: 1699.99, wtts: 125, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i7-12700KF', socket: 'LGA1700', preco: 1999.99, wtts: 125, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i7-14700K', socket: 'LGA1700', preco: 2799.99, wtts: 125, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i7-14700KF', socket: 'LGA1700', preco: 2249.99, wtts: 125, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i9-14900K', socket: 'LGA1700', preco: 2999.99, wtts: 125, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i9-14900KF', socket: 'LGA1700', preco: 2999.99, wtts: 125, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i7-14700F', socket: 'LGA1700', preco: 2599.99, wtts: 65, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i9-12900F', socket: 'LGA1700', preco: 1999.99, wtts: 65, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i9-12900KF', socket: 'LGA1700', preco: 2599.99, wtts: 125, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i3-14100F', socket: 'LGA1700', preco: 699.99, wtts: 60, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i7-12700', socket: 'LGA1700', preco: 2129.90, wtts: 65, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i7-12700F', socket: 'LGA1700', preco: 2158.15, wtts: 65, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core i7-12700K', socket: 'LGA1700', preco: 2681.71, wtts: 125, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core Ultra 5 225', socket: 'LGA1851', preco: 1499.99, wtts: 65, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core Ultra 5 225F', socket: 'LGA1851', preco: 569.99, wtts: 65, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core Ultra 5 245K', socket: 'LGA1851', preco: 799.99, wtts: 125, graficoIntegrado: true, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
  { nome: 'Core Ultra 5 245KF', socket: 'LGA1851', preco: 699.99, wtts: 125, graficoIntegrado: false, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/cpus/intel logo.webp' },
];


const todasCpus = [...cpusRyzen5, ...cpusRyzen7, ...cpusRyzen9, ...cpusIntel];

  for (const cpu of todasCpus) {
    await prisma.cpu.upsert({
      where: { nome: cpu.nome },
      update: {
        preco: cpu.preco,
        wtts: cpu.wtts,
        graficoIntegrado: cpu.graficoIntegrado, 
        imagemUrl: cpu.imagemUrl
      },
      create: {
        nome: cpu.nome,
        socketId: socketMap[cpu.socket],
        preco: cpu.preco,
        wtts: cpu.wtts,
        graficoIntegrado: cpu.graficoIntegrado, 
        imagemUrl: cpu.imagemUrl
      },
    });
  }

  console.log(`Seed concluído ${todasCpus.length} CPUs processadas.`);

 
const motherboardsAM4 = [
    { nome: 'MSI A520M-A PRO', socket: 'AM4', tipoRam: 'DDR4', formFactor: 'mATX', preco: 399.00, Maximo_de_ram: 64, slots_de_memoria: 2, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/msia520.webp' },
    { nome: 'ASRock A520M-HVS', socket: 'AM4', tipoRam: 'DDR4', formFactor: 'mATX', preco: 379.00, Maximo_de_ram: 64, slots_de_memoria: 2, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/a520hvs.webp' },
    { nome: 'ASrock B450M-HDV', socket: 'AM4', tipoRam: 'DDR4', formFactor: 'mATX', preco: 349.00, Maximo_de_ram: 32, slots_de_memoria: 2, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/b450hdv.webp' },
    { nome: 'Gigabyte B550M Aorus Elite', socket: 'AM4', tipoRam: 'DDR4', formFactor: 'mATX', preco: 899.00, Maximo_de_ram: 128, slots_de_memoria: 4, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/b550aorus.webp' },
    { nome: 'Gigabyte B550M K', socket: 'AM4', tipoRam: 'DDR4', formFactor: 'mATX', preco: 549.00, Maximo_de_ram: 64, slots_de_memoria: 2, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/b550mk.webp' },
    {nome: 'Gigabyte B550M DS3H AC R2', socket: 'AM4', tipoRam: 'DDR4', formFactor: 'mATX', preco: 699.00, Maximo_de_ram: 128, slots_de_memoria: 4, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/b550mds3h.webp'},
    {nome: 'ASUS TUF Gaming B550M-Plus', socket: 'AM4', tipoRam: 'DDR4', formFactor: 'mATX', preco: 799.00, Maximo_de_ram: 128, slots_de_memoria: 4, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/b550mtuff.webp'},
  ];

const motherboardsLGA1700 = [
  { nome: 'MSI PRO B760M-P DDR4, Chipset B760,', socket:'LGA1700', tipoRam:'DDR4', formFactor:'mATX', preco: 770.00, Maximo_de_ram: 128, slots_de_memoria: 4, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/msib760mp.webp' },
  { nome: 'Gigabyte H610M K V2', socket: 'LGA1700', tipoRam: 'DDR5', formFactor: 'mATX', preco: 440.00, Maximo_de_ram: 128, slots_de_memoria: 2, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/gigabyteh610mk.webp' },
  { nome: 'MSI Pro B760M-E', socket: 'LGA1700', tipoRam: 'DDR4', formFactor: 'mATX', preco: 769.00, Maximo_de_ram: 128, slots_de_memoria: 4, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/msib760me.webp' },
  { nome: 'ASUS Prime H610M-E D4', socket: 'LGA1700', tipoRam: 'DDR4', formFactor: 'mATX', preco: 765.00, Maximo_de_ram: 64, slots_de_memoria: 2, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/asus610.webp' },
  { nome: 'Gigabyte B760M DS3H DDR5', socket: 'LGA1700', tipoRam: 'DDR5', formFactor: 'mATX', preco: 1170.00, Maximo_de_ram: 256, slots_de_memoria: 4, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/b760giga.webp' },
  { nome: 'MSI Pro B760M-A DDR5', socket: 'LGA1700', tipoRam: 'DDR5', formFactor: 'mATX', preco: 849.00, Maximo_de_ram: 256, slots_de_memoria: 4, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/tuff1700.webp' },
];

const motherboardsLGA1851 = [
  { nome: 'Gigabyte B860M Aorus Elite', socket: 'LGA1851', tipoRam: 'DDR5', formFactor: 'mATX', preco: 1729.00, Maximo_de_ram: 256, slots_de_memoria: 4, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/aorusblack.webp' },
  { nome: 'Gigabyte B860M Aorus Elite WiFi6E Ice', socket: 'LGA1851', tipoRam: 'DDR5', formFactor: 'mATX', preco: 1799.00, Maximo_de_ram: 256, slots_de_memoria: 4, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/aorusice.webp' },
  { nome: 'ASUS B860M AYW Gaming', socket: 'LGA1851', tipoRam: 'DDR5', formFactor: 'mATX', preco: 1419.00, Maximo_de_ram: 256, slots_de_memoria: 4, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/ayw.webp' },
];

const motherboardsAM5 = [
  { nome: 'gabyte B650M Gaming Rev.1.0', socket: 'AM5', tipoRam: 'DDR5', formFactor: 'mATX', preco: 999.00, Maximo_de_ram: 128, slots_de_memoria: 4, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/gigabyterev.webp' },
  { nome: 'ASUS Prime A620M-E', socket: 'AM5', tipoRam: 'DDR5', formFactor: 'mATX', preco: 775.00, Maximo_de_ram: 128, slots_de_memoria: 2, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/a620asus.webp' },
  { nome: 'MSI MAG B650 Tomahawk', socket: 'AM5', tipoRam: 'DDR5', formFactor: 'ATX', preco: 1800.00, Maximo_de_ram: 256, slots_de_memoria: 4, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/tomahawk.webp' },
  { nome: 'Gigabyte B650M Aorus Elite AX', socket: 'AM5', tipoRam: 'DDR5', formFactor: 'mATX', preco: 1480.00, Maximo_de_ram: 128, slots_de_memoria: 4, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/aoruseliteddr5.webp' }, 
  { nome: 'Gigabyte B650M Aorus Elite AX', socket: 'AM5', tipoRam: 'DDR5', formFactor: 'mATX', preco: 1480.00, Maximo_de_ram: 128, slots_de_memoria: 4, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/tuffddr5.webp' }, 
  {nome: 'MSI B850M GAMING PLUS WIFI6E', socket: 'AM5', tipoRam: 'DDR5', formFactor: 'mATX', preco: 1499.00, Maximo_de_ram: 128, slots_de_memoria: 4, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/motherboards/msib859.webp' },
];

  const todasMotherboards = [...motherboardsAM4, ...motherboardsLGA1700, ...motherboardsLGA1851,...motherboardsAM5];

  for (const motherboard of todasMotherboards) {
    await prisma.motherboard.upsert({
      where: { nome: motherboard.nome },
      update: {
        preco: motherboard.preco,
        tipoRam: motherboard.tipoRam,
        formFactor: motherboard.formFactor,
        Maximo_de_ram: motherboard.Maximo_de_ram,
        imagemUrl: motherboard.imagemUrl,
        slots_de_memoria: motherboard.slots_de_memoria,
      },
      create: {
        nome: motherboard.nome,
        socketId: socketMap[motherboard.socket],
        tipoRam: motherboard.tipoRam,
        formFactor: motherboard.formFactor,
        preco: motherboard.preco,
        Maximo_de_ram: motherboard.Maximo_de_ram,
        slots_de_memoria: motherboard.slots_de_memoria, 
        imagemUrl: motherboard.imagemUrl,
      },
    });
  }

  console.log(`Seed concluído: ${todasMotherboards.length} motherboards processadas.`);

const ramsDDR4 = [
  { nome: 'Corsair Vengeance RGB Pro 2666MHz 8GB', tipo: 'DDR4', tamanho: 8, pentes: 2, preco: 1326.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/rams/corsairrgb.webp' },
  {nome: 'Corsair Vengeance RGB Pro 2666MHz 16GB', tipo: 'DDR4', tamanho: 16, pentes: 2, preco: 2326.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/rams/corsairrgb.webp' },
  { nome: 'Kingston Fury Beast 3200MHz', tipo: 'DDR4', tamanho: 8, pentes: 1, preco: 1221.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/rams/kingstonddr4.webp' },
  { nome: 'Kingston Fury Beast 3200MHz', tipo: 'DDR4', tamanho: 16, pentes: 1, preco: 1221.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/rams/kingstonddr4.webp' },
  { nome: 'Kingston Fury Beast 3200MHz', tipo: 'DDR4', tamanho: 32, pentes: 1, preco: 1221.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/rams/kingstonddr4.webp' },
  { nome: 'Husky Impulse 3200MHz 16GB', tipo: 'DDR4', tamanho: 16, pentes: 1, preco: 669.99, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/rams/huskyram.webp' },
  { nome: 'Husky Impulse 3200MHz 8GB', tipo: 'DDR4', tamanho: 8, pentes: 1, preco: 379.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/rams/huskyram.webp' },
  { nome: 'Kingston Fury Beast RGB 3600MHz 8GB', tipo: 'DDR4', tamanho: 8, pentes: 1, preco: 845.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/rams/kingstonddr4.webp' },
]; 

const ramsDDR5 = [
  { nome: 'Kingston Fury Beast 5600MHz 16GB', tipo: 'DDR5', tamanho: 16, pentes: 1, preco: 1800.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/rams/kingstonddr4.webp' },
  { nome: 'Corsair Vengeance 6000MHz 16GB', tipo: 'DDR5', tamanho: 16, pentes: 2, preco: 3500.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/rams/corsairddr5.webp' },
  { nome: 'Kingston Fury Beast 5600MHz 8GB', tipo: 'DDR5', tamanho: 8, pentes: 1, preco: 1400.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/rams/kingstonddr4.webp' },
];
const todasRams = [...ramsDDR4, ...ramsDDR5];

for (const ram of todasRams) {
  await prisma.ram.upsert({
    where: { nome: ram.nome },
    update: {
      preco: ram.preco,
      tipo: ram.tipo,
      tamanho: ram.tamanho,
      pentes: ram.pentes, 
      imagemUrl: ram.imagemUrl,
    },
    create: {
      nome: ram.nome,
      tipo: ram.tipo,
      tamanho: ram.tamanho,
      pentes: ram.pentes,
      preco: ram.preco, 
      imagemUrl: ram.imagemUrl,
    }, 
    
  }); 
  } 
   console.log(`Seed concluído: ${todasRams.length} ram processadas.`); 

   const gpus = [
  { nome: 'ASRock Placa AMD Radeon RX 6600 Challenger branca 8GB', tdp: 132, memoria: 8, preco: 2100.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/6600asrock.webp' },
  { nome: 'ASUS TUF Gaming Radeon RX 9060 XT OC Edition 16GB', tdp: 180, memoria: 16, preco: 4800.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/9060asus.webp' },
  { nome:  'ASRock Radeon RX 9070 XT Challenger, AMD, 16GB', tdp: 304, memoria: 16, preco: 5500.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/9070asrock.webp' },
  { nome: 'RX 7600 Challenger ASRock AMD Radeon, 8GB', tdp: 165, memoria: 8, preco: 1899.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/asrock7600.webp' },
  { nome: 'MSI GeForce RTX5050 8GB ', tdp: 130, memoria: 8, preco: 2450.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/5050MSI.webp' },
  { nome: 'ASRock Arc B580 Challenger OC 12GB', tdp: 190, memoria: 12, preco: 1969.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/5060shadow.webp' },
  { nome: 'MSI RTX 5060 Shadow 2X OC 8GB', tdp: 145, memoria: 8, preco: 2300.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/5060shadow.webp' },
  { nome: 'ASRock RX 9060 XT CL16GO 16GB', tdp: 182, memoria: 16, preco: 2800.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/5060shadow.webp' },
  { nome: 'ASUS RTX 5060 Ti 16GB', tdp: 180, memoria: 16, preco: 4299.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/5060shadow.webp' },
  { nome: 'RTX 5070 Infinity 3 12GB', tdp: 250, memoria: 12, preco: 4699.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/5060shadow.webp' },
  { nome: 'ASUS Prime RTX 9070 XT OC Edition 16GB', tdp: 304, memoria: 16, preco: 4800.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/5060shadow.webp'},
  { nome: 'Powercolor Reaper RX 9070 XT', tdp: 304, memoria: 16, preco: 4200.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/5060shadow.webp' },
  {nome:  'MSI RTX 5060 Shadow 2X OC, 8GB,', tdp: 300, memoria: 8, preco: 3000.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/5060shadow.webp' },
  { nome: 'MSI GeForce RTX 5060 Ti 8G SHADOW 2X OC', tdp: 180, memoria: 8, preco: 3999.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/5060tigigabyte.webp' },
  { nome: 'Gigabyte RTX 5070 EAGLE OC SFF 12G NVIDIA GeForce, 12GB', tdp: 300, memoria: 12, preco: 5400.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/5070eagle.webp' },
  { nome: 'MSI RTX 5080 Gaming Trio OC 16GB', tdp: 360, memoria: 16, preco: 15000.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/5080trio.webp' },
  { nome: 'MSI RTX 5080 Shadow 16GB', tdp: 360, memoria: 16, preco: 13299.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/5080shadow.webp' },
  { nome: 'ASUS ROG Astral RTX 5090 White 32GB', tdp: 575, memoria: 32, preco: 30000.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/5090white.webp' },
  { nome: 'Gigabyte GeForce RTX 5090 Gaming OC 32GB', tdp: 600, memoria: 32, preco: 34999.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/gpus/5090gigabyte.webp' },
]; 

for (const gpu of gpus) {
  await prisma.gpu.upsert({
    where: { nome: gpu.nome },
    update: {
      tdp: gpu.tdp,
      memoria: gpu.memoria,
      preco: gpu.preco,
      imagemUrl: gpu.imagemUrl
    },
    create: {
      nome: gpu.nome,
      tdp: gpu.tdp,
      memoria: gpu.memoria,
      preco: gpu.preco,
      imagemUrl: gpu.imagemUrl
    },
  });
}
 console.log(`Seed concluído: ${gpus.length} GPUs processadas.`); 

const ssds = [
  { nome: 'Kingston A400 480GB', tamanho: 480, tipoSsd: 'SATA_2_5', preco: 534.99, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/kingstonssd.webp' },
  { nome: 'Rise Mode Gamer Line 480GB', tamanho: 480, tipoSsd: 'SATA_2_5', preco: 459.99, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/risessd.webp' },
  { nome: 'Adata SU650 512GB', tamanho: 512, tipoSsd: 'SATA_2_5', preco: 639.90, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/ssdadata.webp' },
  { nome: 'Adata SU630 480GB', tamanho: 480, tipoSsd: 'SATA_2_5', preco: 599.99, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/ssdadata.webp' },
  { nome: 'WD Green 480GB', tamanho: 480, tipoSsd: 'SATA_2_5', preco: 515.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/ssdwd.webp' }, 
  { nome: 'SSD Lexar NS100, 1TB, SATA III, 2.5"', tamanho:1000, tipoSsd: 'SATA_2_5', preco: 935.05, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/ssdlexar.webp' },
  { nome:'SSD Adata SU650, 256GB, SATA III, 2.5', tamanho: 256, tipoSsd:'SATA_2_5', preco: 345.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/ssdadata.webp' },
]; 
const ssdsNvme = [
  { nome: 'Kingston NV3 500GB', tamanho: 500, tipoSsd: 'NVME_M2', preco: 729.99, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/nvmekingston.webp' },
  { nome: 'Sandisk WD Green SN3000 500GB', tamanho: 500, tipoSsd: 'NVME_M2', preco: 679.99, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/wdgreen500.webp' },
  { nome: 'Adata Legend 860 500GB', tamanho: 500, tipoSsd: 'NVME_M2', preco: 764.99, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/adatalegend.webp' },
  { nome: 'Adata Legend 710 256GB', tamanho: 256, tipoSsd: 'NVME_M2', preco: 549.99, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/adatalegend.webp' },
]; 
const ssdsNvme1TB = [
  { nome: 'Kingston NV3 1TB', tamanho: 1000, tipoSsd: 'NVME_M2', preco: 930.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/nvmekingston.webp'  },
  { nome: 'Sandisk WD Green SN350 1TB', tamanho: 1000, tipoSsd: 'NVME_M2', preco: 949.99, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/wdgreen1.webp' },
  { nome: 'Husky ThunderBoost 1TB', tamanho: 1000, tipoSsd: 'NVME_M2', preco: 949.99, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/husky1tb.webp' },
  { nome: 'Adata XPG S70 Blade 1TB', tamanho: 1000, tipoSsd: 'NVME_M2', preco: 1699.99, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/adatalegend.webp' },
  { nome: 'Husky ThunderBoost Gen4 1TB', tamanho: 1000, tipoSsd: 'NVME_M2', preco: 1348.98, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/husky1tb.webp' },
];

const ssdsNvme2TB = [
  { nome: 'Corsair MP600 Elite 2TB', tamanho: 2000, tipoSsd: 'NVME_M2', preco: 2499.90, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/corsairelite.webp' },
  { nome: 'Kingston NV3 2TB', tamanho: 2000, tipoSsd: 'NVME_M2', preco: 2412.99, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/nvmekingston.webp'  },
  { nome: 'Kingston KC3000 2TB', tamanho: 2000, tipoSsd: 'NVME_M2', preco: 3599.99, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/kingston2.webp' },
  { nome: 'Sandisk WD Black SN8100 2TB', tamanho: 2000, tipoSsd: 'NVME_M2', preco: 4119.90, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/wdblack.webp' },
  { nome: 'Sandisk Plus 2TB', tamanho: 2000, tipoSsd: 'NVME_M2', preco: 1730.85, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/sandiskplus.webp' },
  { nome: 'Adata Legend 860 2TB', tamanho: 2000, tipoSsd: 'NVME_M2', preco: 2478.99, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/adatalegend.webp' },
  { nome: 'WD Green SN350 2TB', tamanho: 2000, tipoSsd: 'NVME_M2', preco: 1766.05, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/wdgreen.webp' },
  { nome: 'Corsair Force MP600 Pro XT 2TB', tamanho: 2000, tipoSsd: 'NVME_M2', preco: 3399.90, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/ssds/corsairnvme.webp' }, 
  
];
const todosSsds = [...ssds, ...ssdsNvme, ...ssdsNvme1TB, ...ssdsNvme2TB];

for (const ssd of todosSsds) {
  await prisma.ssd.upsert({
    where: { nome: ssd.nome },
    update: {
      tamanho: ssd.tamanho,
      tipoSsd: ssd.tipoSsd,
      preco: ssd.preco, 
      imagemUrl: ssd.imagemUrl,
    },
    create: {
      nome: ssd.nome,
      tamanho: ssd.tamanho,
      tipoSsd: ssd.tipoSsd,
      preco: ssd.preco, 
      imagemUrl: ssd.imagemUrl,
    },
  });
}
 console.log(`Seed concluído: ${todosSsds.length} ssds processados.`); 

const psus = [
  { nome: 'Husky Sledger 550W', wtts: 550, seloEficiencia: 'PLUS_80_WHITE', preco: 200.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/psu/HUSKYSL.webp' },
  { nome: 'Corsair CX 550W', wtts: 550, seloEficiencia: 'PLUS_80_BRONZE', preco: 479.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/psu/CSCX.webp' },
  { nome: 'MSI MAG A650BN 650W', wtts: 650, seloEficiencia: 'PLUS_80_BRONZE', preco: 249.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/psu/MSIMAG.webp' },
  { nome: 'Gigabyte P650G PG5 650W', wtts: 650, seloEficiencia: 'PLUS_80_GOLD', preco: 249.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/psu/GIGA650.webp' },
  { nome: 'MSI MAG A600DN 600W', wtts: 600, seloEficiencia: 'PLUS_80_WHITE', preco: 279.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/psu/MAG600.webp' },
  { nome: 'Cooler Master MWE Gold 750 V3 ATX 3.1', wtts: 750, seloEficiencia: 'PLUS_80_GOLD', preco: null, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/psu/MASTER750.webp' },
  { nome: 'Corsair CX750', wtts: 750, seloEficiencia: 'PLUS_80_BRONZE', preco: null, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/psu/CSCX750.webp' },
  { nome: 'MSI MAG A850GL 850W Modular', wtts: 850, seloEficiencia: 'PLUS_80_GOLD', preco: 879.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/psu/MAG850.webp' },
  { nome: 'Gigabyte UD 850W', wtts: 850, seloEficiencia: 'PLUS_80_GOLD', preco: 799.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/psu/GIGAUD.webp' },
  { nome: 'Husky Sledger 950W Cybenetics', wtts: 950, seloEficiencia: 'PLUS_80_PLATINUM', preco: 689.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/psu/HUSKYSL950.webp' },
  { nome: 'Montec 1000W', wtts: 1000, seloEficiencia: 'PLUS_80_PLATINUM', preco: 1299.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/psu/MONTEC.webp' },
  { nome: 'ASUS TUF Gaming 1000W', wtts: 1000, seloEficiencia: 'PLUS_80_GOLD', preco: 1299.00, imagemUrl: 'https://pub-bd81407a7e5a48a39e79dcc217e83482.r2.dev/psu/ASUS1000.webp' },
];

for (const psu of psus) {
  await prisma.psu.upsert({
    where: { nome: psu.nome },
    update: {
      wtts: psu.wtts,
      seloEficiencia: psu.seloEficiencia,
      preco: psu.preco, 
      imagemUrl: psu.imagemUrl,
    },
    create: {
      nome: psu.nome,
      wtts: psu.wtts,
      seloEficiencia: psu.seloEficiencia,
      preco: psu.preco, 
      imagemUrl: psu.imagemUrl,
    },
  });
}
console.log(`Seed concluído: ${psus.length} PSUs processadas.`); 

const coolers = [
  { nome: 'Rise Mode Z5 LED Rainbow AMD/Intel 90mm (RM-ACZ-Z5-RGB)', tipo: 'AIR', preco: 38.00 },
  { nome: 'Mach1 Artic ARGB AMD/Intel 120mm (A40)', tipo: 'AIR', preco: 74.00 },
  { nome: 'Rise Mode G800 ARGB AMD/Intel 90mm', tipo: 'AIR', preco: 90.00 },
  { nome: 'Husky Alisius 500 ARGB Display AMD/Intel 120mm 220W', tipo: 'AIR', preco: 129.00 },
  { nome: 'TRYX Turris T620 Dual Tower LCD 5" 6 Heatpipes 120mm 280W', tipo: 'AIR', preco: 899.00 },
  { nome: 'Rise Mode Temp 6 Black AMD/Intel 120mm 240W', tipo: 'AIR', preco: 144.00 },
  { nome: 'Rise Mode Aura Ice ARGB 360mm AMD/Intel 300W', tipo: 'WATER', preco: 279.00 },
  { nome: 'Rise Mode Aura Ice Black ARGB 120mm AMD/Intel 220W', tipo: 'WATER', preco: 190.00 },
];

for (const cooler of coolers) {
  await prisma.cpuCooler.upsert({
    where: { nome: cooler.nome },
    update: {
      tipo: cooler.tipo,
      preco: cooler.preco,
    },
    create: {
      nome: cooler.nome,
      tipo: cooler.tipo,
      preco: cooler.preco,
    },
  });
}
console.log(`Seed concluído: ${coolers.length} coolers processados.`);
const cases = [
  { nome: 'Montech X3 Mesh Mid-Tower 6x Fans ARGB Preto (X3MESHBK)', preco: 269.90 },
  { nome: 'ESGaming Zero Mid Tower M-ATX Vidro Temperado Sem Fans Preto (ZERO-BK)', preco: 219.90 },
  { nome: 'Husky Dome 210 Mini Tower M-ATX Vidro Sem Fans Branco (HGN210BR)', preco: 189.99 },
  { nome: 'K-mex Ghost Shark Full Tower ATX Sem Cooler (Cg-02j1)', preco: 349.94 },
];

for (const gabinete of cases) {
  await prisma.case.upsert({
    where: { nome: gabinete.nome },
    update: {
      preco: gabinete.preco,
    },
    create: {
      nome: gabinete.nome,
      preco: gabinete.preco,
    },
  });
}
console.log(`Seed concluído: ${cases.length} gabinetes processados.`);
}



main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect()); 

