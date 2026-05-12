'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { ArrowRight, Play, Camera, Mic, Monitor, Smartphone, Video, Heart, MessageCircle, Ticket } from 'lucide-react';
import { FaInstagram, FaTwitter, FaYoutube, FaTwitch, FaTiktok } from 'react-icons/fa';

export default function Home() {
  // Estado para armazenar os dados dinâmicos do YouTube
  const [youtubeData, setYoutubeData] = useState({
    followers: '22.200+',
    views: '20.5K+ Views'
  });

  const [instagramData, setInstagramData] = useState({
    followers: '10k+',
    views: '20m+ Views'
  });

  // Busca os dados do YouTube ao carregar a página
  useEffect(() => {
    async function fetchYoutube() {
      try {
        const res = await fetch('/api/youtube');
        const data = await res.json();
        if (data.subscribers) {
          setYoutubeData({
            followers: new Intl.NumberFormat('pt-BR').format(data.subscribers),
            views: `${new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(data.views)}+ Views`
          });
        }
      } catch (err) {
        console.error("Erro ao buscar dados do Youtube:", err);
      }
    }
    fetchYoutube();

    async function fetchInstagram() {
      try {
        const res = await fetch('/api/instagram', { cache: 'no-store' });
        const data = await res.json();
        if (data.followers) {
          setInstagramData({
            followers: new Intl.NumberFormat('pt-BR').format(data.followers),
            views: `${new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(data.views)}+ Views`
          });
        }
      } catch (err) {
        console.error("Erro ao buscar dados do Instagram:", err);
      }
    }
    fetchInstagram();
  }, []);

  // Hooks para o efeito de Parallax e Zoom Out no scroll
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.75]); // Vai de 100% a 75% de tamanho
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]); // Vai desaparecendo suavemente
  const heroY = useTransform(scrollY, [0, 500], [0, 150]); // Desce levemente para dar efeito de profundidade

  // Hooks para a timeline horizontal
  const carouselRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: scrollYProgressTimeline } = useScroll({
    target: carouselRef,
    offset: ["start start", "end end"] // Mapeia exatamente o início e o fim da seção de 300vh
  });

  // Adiciona uma física elástica (smooth) para acabar com movimentos bruscos
  const smoothProgress = useSpring(scrollYProgressTimeline, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Usamos uma função anônima para montar a string calc() perfeitamente.
  // Isso resolve o bug do Framer Motion ao tentar animar strings de formatos diferentes.
  const xTimeline = useTransform(smoothProgress, (p) => `calc(${p * -100}% + ${p * 100}vw)`);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Curva "snappy" estilo site premium
      },
    },
  };

  const revealVariants: Variants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const floatingVariants: Variants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const projects = [
    {
      id: 1,
      title: 'Projeto Viral #1',
      description: '+1M visualizações orgânicas',
      gradient: 'from-red-600 to-rose-600',
      views: '1.2M',
      youtubeId: 'ZmCopOVz6xo',
      span: 'md:col-span-12 lg:col-span-8',
    },
    {
      id: 2,
      title: 'Conteúdo viral',
      description: 'Produção viral em evento com base em trend criada por mim',
      gradient: 'from-red-500 to-orange-500',
      views: '4.1mi',
      instagramId: 'DSyGAv2klJj',
      span: 'md:col-span-12 lg:col-span-4',
    },
    {
      id: 3,
      title: 'Conteúdo viral',
      description: 'Produção viral em evento com trend que é a minha assinatura',
      gradient: 'from-rose-500 to-red-500',
      views: '5.7mi',
      shortsId: 'bBzQVUmKo3g',
      span: 'md:col-span-12 lg:col-span-6',
    },
    {
      id: 4,
      title: 'Conteúdo viral',
      description: 'Produção viral em evento com trend que é a minha assinatura',
      gradient: 'from-red-700 to-red-500',
      views: '4.8mi',
      tiktokId: '7521444398396165381',
      span: 'md:col-span-12 lg:col-span-6',
    },
    {
      id: 5,
      title: 'Projeto IEM RIO',
      description: 'Todo produzido e pensado por mim, junto com empresa parceira',
      gradient: 'from-orange-500 to-red-600',
      views: 'Playlist',
      playlistId: 'PLHtHSGnd-4BHJ6-dd6-IcvHdAv08xFf3D',
      thumbnail: '/projetos/img1.jpg',
      span: 'md:col-span-12 lg:col-span-12',
    },
  ];

  const shorts = [
    {
      id: 1,
      title: 'Short Viral #1',
      views: '1.2Mi',
      tiktokId: '7564167664118025490',
    },
    {
      id: 2,
      title: 'Short Viral #2',
      views: '1.3Mi',
      youtubeShortId: 'TWZeq_9wR8A',
    },
    {
      id: 3,
      title: 'Short Viral #3',
      views: '2.3Mi',
      instagramId: 'DPkFoKrAEn8',
    },
    {
      id: 4,
      title: 'Short Viral #4',
      views: '1.5Mi',
      tiktokId: '7518155254215478534',
    },
    {
      id: 5,
      title: 'Short Viral #5',
      views: '1.3Mi',
      youtubeShortId: 'k0iBs95SOLs',
    },
    {
      id: 6,
      title: 'Short Viral #6',
      views: '1.7Mi',
      instagramId: 'DQFkx6MAKIr',
    },
  ];

  const workHistoryData = [
    {
      title: 'Campanha Lifestyle',
      desc: 'Direção criativa e vídeo para a maior marca de streetwear nacional.',
      image: '/projetos/img1.jpg',
    },
    {
      title: 'Vlog em Tóquio',
      desc: 'Série de vídeos imersivos explorando a cultura japonesa.',
      image: '/projetos/img2.jpg',
    },
    {
      title: 'Lançamento Podcast',
      desc: 'Cenário e identidade visual do projeto gravado em estúdio.',
      image: '/projetos/img3.jpg',
    },
    {
      title: 'Design de Sneaker',
      desc: 'Collab exclusiva com design próprio que esgotou em horas.',
      image: '/projetos/img4.jpg',
    },
    {
      title: 'Bastidores de Festival',
      desc: 'Cobertura completa de 3 dias do maior evento de música.',
      image: '/projetos/img5.jpg',
    },
    {
      title: 'Campanha Lifestyle',
      desc: 'Direção criativa e vídeo para a maior marca de streetwear nacional.',
      image: '/projetos/img6.jpg',
    },
    {
      title: 'Vlog em Tóquio',
      desc: 'Série de vídeos imersivos explorando a cultura japonesa.',
      image: '/projetos/img7.jpg',
    },
  ];

  const stats = [
    { number: '2.440.500+', label: 'Total Visualizações' },
    { number: '50.319+', label: 'Seguidores' },
    { number: '79.5K+', label: 'Contas Alcançadas' },
    { number: '2.2mi+', label: 'Curtidas no TikTok' },
  ];

  const brands = [
    { name: 'Atlético Mineiro', logo: '/brands/Atletico_mineiro_galo.png' },
    { name: 'Arena MRV', logo: '/brands/Arena_mrv.png' },
    { name: 'Ubisoft', logo: '/brands/ubisoft_logo.png' },
    { name: 'Rainbow Six', logo: '/brands/rainbowsix_logo.jpg' },
    { name: 'Mastercard', logo: '/brands/Mastercard-logo.svg' },
    { name: 'KitKat', logo: '/brands/kitkat_logo.png' },
    { name: 'CBLOL', logo: '/brands/cblol_logo.png' },
    { name: 'ElHero', logo: '/brands/elhero_logo.jpg' },
    { name: 'Sesc Geek', logo: '/brands/sescgeek_logo.jpeg' },
    { name: 'Red Bull', logo: '/brands/redbull_logo.png' },
    { name: 'Itatiaia', logo: '/brands/itatiaia_logo.png' },
    { name: 'Lbee', logo: '/brands/lbee_logo.jpg' },
    { name: 'Buffly', logo: '/brands/buffly_logo.png' },
    { name: 'Trexx', logo: '/brands/Trexx_logo.png' },
  ];
  // Duplicamos a lista para o efeito de "scroll infinito" ser contínuo e sem quebras
  const infiniteBrands = [...brands, ...brands];

  const services = [
    { title: 'Cobertura de Eventos', desc: 'Apresentação dinâmica para reter a atenção do público.',img: "/projetos/evento.jpg" , icon: <Mic className="w-8 h-8 mb-4 text-orange-500" />, span: 'md:col-span-2 md:row-span-2', gradient: 'from-red-600/20 to-orange-600/20' },
    { title: 'Publis', desc: 'Vídeos autênticos que convertem e geram desejo para a sua marca.',img: "/projetos/vestiario-galo.jpg.jpeg" , icon: <Camera className="w-8 h-8 mb-4 text-rose-500" />, span: 'md:col-span-1 md:row-span-1', gradient: 'from-rose-600/20 to-pink-600/20' },
    { title: 'Host de Lives', desc: 'Vlogs e bastidores mostrando a energia real do evento.Apresentação dinâmica para reter a atenção do público.',img: "/projetos/img5.jpg" , icon: <Video className="w-8 h-8 mb-4 text-red-500" />, span: 'md:col-span-1 md:row-span-1', gradient: 'from-orange-600/20 to-amber-600/20' },
  ];

  const networkStats = [
    { id: 1, name: 'Instagram', followers: instagramData.followers, metric: instagramData.views, icon: <FaInstagram size={32} />, color: 'from-pink-500 to-purple-600', textColor: 'text-pink-500' },
    { id: 2, name: 'TikTok', followers: '16.400+', metric: '2.4+ mi Views', icon: <FaTiktok size={32} />, color: 'from-cyan-500 to-blue-600', textColor: 'text-cyan-500' },
    { id: 3, name: 'YouTube', followers: youtubeData.followers, metric: youtubeData.views, icon: <FaYoutube size={32} />, color: 'from-red-500 to-red-700', textColor: 'text-red-500' },
    { id: 4, name: 'Twitch', followers: '1.719+', metric: '100K+ Horas/mês', icon: <FaTwitch size={32} />, color: 'from-purple-500 to-purple-700', textColor: 'text-purple-500' },
  ];

  const coupons = [
    { id: 1, brand: 'Overclock', code: 'BOLA', discount: '10% OFF', link: 'https://bebaoverclock.com.br/' },
    { id: 2, brand: 'Somos Resenha', code: 'Bola15', discount: '15% OFF', link: 'https://somosresenha.com.br/' },
    { id: 3, brand: 'Rainclub', code: 'BOLA', discount: '10% OFF', link: 'https://www.instagram.com/the.rainclub/reels/' },
    { id: 4, brand: 'No Ping', code: 'bola', discount: '10 Dias Gratis', link: 'https://noping.com/pt' },
  ];

  const testimonials = [
    { id: 1, name: '@fã_clube1', comment: 'Mano, a qualidade das tuas edições tá absurda! Inspiração total 🔥', likes: '15.2K', time: '2h' },
    { id: 2, name: '@marca_parceira', comment: 'O engajamento dessa campanha bateu todos os nossos recordes. Samuel entregou tudo!', likes: '4.8K', time: '1d' },
    { id: 3, name: '@editor_pro', comment: 'Qual câmera você usou nesse take? As cores tão perfeitas demais 🎬', likes: '890', time: '5h' },
    { id: 4, name: '@seguidor_diario', comment: 'Acompanho desde o começo, evolução surreal irmão! Pra cima 🚀', likes: '12.4K', time: '3d' },
  ];

  return (
    <main className="w-full bg-gradient-to-b from-black via-slate-900 to-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/video/Background_video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
        </div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-red-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-rose-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-4 md:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-medium">
              ✨ O MELHOR CRIADOR DE CONTEÚDO
            </span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              variants={revealVariants}
              className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none text-white"
            >
              Samuel
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              variants={revealVariants}
              className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600"
            >
              Bola
            </motion.h1>
          </div>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Conteúdo viral, autêntico e inspirador. Acompanhe minhas criações impactantes!
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-500/50 transition-all"
            >
              Ver Trabalhos <ArrowRight size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-gray-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 transition-all"
            >
              <Play size={20} /> Reel Destacado
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={floatingVariants}
            animate="float"
            className="mt-16 flex justify-center w-full"
          >
            <div className="w-6 h-10 border-2 border-red-500 rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1 h-2 bg-red-500 rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Brands Logo Wall */}
      <section className="py-16 border-y border-white/5 bg-black/50 overflow-hidden relative flex flex-col items-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/50 text-sm md:text-base uppercase tracking-widest font-semibold mb-10 text-center"
        >
          Marcas que já trabalhei
        </motion.h3>
        <div className="relative w-full flex items-center">
          <div className="absolute left-0 w-16 md:w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 w-16 md:w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex gap-16 md:gap-24 items-center whitespace-nowrap w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {infiniteBrands.map((brand, i) => (
              <div key={i} className="flex flex-col items-center gap-4 text-white/20 hover:text-white/80 transition-colors duration-300 cursor-default group">
                <div className="relative h-10 w-24 transform group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <span className="text-2xl md:text-4xl font-black tracking-tight">{brand.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Infinite Marquee Section */}
      <section className="relative w-full py-6 bg-red-600 overflow-hidden transform -skew-y-2 z-20 shadow-2xl shadow-red-500/20 flex items-center">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8 px-4 text-black font-black text-4xl md:text-5xl uppercase tracking-widest items-center">
              <span>CRIADOR DE CONTEÚDO</span>
              <span>•</span>
              <span>VIRAL</span>
              <span>•</span>
              <span>LIFESTYLE</span>
              <span>•</span>
              <span>GAMING</span>
              <span>•</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Bento Grid - Serviços */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4">
            O Que Eu <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Faço</span>
          </h2>
          <p className="text-gray-400 text-lg">Soluções criativas para marcas e comunidade.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-3xl p-8 flex flex-col justify-end group bg-gradient-to-br border border-white/5 ${service.gradient} ${service.span}`}
            >
              <Image src={service.img} alt={service.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="relative z-10">
                {service.icon}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projetos Horizontais Dinâmicos (Scroll) */}
      <section ref={carouselRef} className="relative h-[300vh] bg-black">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-10 md:py-20">
          <div className="px-4 md:px-8 max-w-7xl w-full mx-auto mb-16 shrink-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-3"
            >
              Meus <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-600">Bastidores</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-500 text-lg"
            >
              Deslize para explorar os momentos e projetos que fizeram acontecer
            </motion.p>
          </div>

          <motion.div
            style={{ x: xTimeline }}
            className="flex gap-6 md:gap-8 px-4 md:px-8 w-max h-[70vh] md:h-[65vh] items-center"
          >
            {workHistoryData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 group w-[75vw] sm:w-[50vw] md:w-[35vw] h-full"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="relative h-full rounded-3xl bg-slate-900/30 border border-white/10 overflow-hidden backdrop-blur-sm hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-2xl hover:shadow-red-500/10"
                >
                  {/* Imagem */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 group-hover:via-black/20 transition-all duration-500" />

                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="inline-block px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white text-xs font-semibold uppercase tracking-wider group-hover:border-red-500/30 transition-colors">
                      {index + 1} de {workHistoryData.length}
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
                  >
                    <div>
                      <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-2">{item.title}</h4>
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3">{item.desc}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}

            {/* Espaço vazio no final */}
            <div className="w-[5vw] md:w-[10vw] flex-shrink-0" />
          </motion.div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 left-8 text-gray-500 text-sm font-medium flex items-center gap-2"
          >
            <motion.span
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.span>
            Deslize
          </motion.div>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto w-full mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Trabalhos em Destaque</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Veja alguns dos meus conteúdos mais virais e impactantes
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className={`group relative p-[1px] rounded-[32px] overflow-hidden cursor-pointer ${project.span}`}
            >
              {/* Borda Gradiente Animada */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 group-hover:opacity-80 transition-opacity duration-500`} />

              {/* Conteúdo do Card em Estilo Glassmorphism */}
              <div className="relative h-full bg-slate-950/80 backdrop-blur-2xl rounded-[31px] p-6 md:p-8 flex flex-col gap-6 hover:bg-slate-900/80 transition-colors duration-500 border border-white/5 group-hover:border-white/10">
                {/* Header do Card */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-1 flex items-center gap-3">
                      {project.title}
                      <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-red-500" size={24} />
                    </h3>
                    <p className="text-gray-400 font-medium">{project.description}</p>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-black/50 border border-white/10 flex items-center gap-2 backdrop-blur-md shrink-0 shadow-lg">
                    <Play size={14} className="text-red-500" />
                    <span className="text-white text-sm font-bold">{project.views} views</span>
                  </div>
                </div>

                {/* Container de Mídia (iFrames) */}
                <div className={`relative w-full ${project.youtubeId || project.playlistId ? 'aspect-video' : 'aspect-[4/5]'} rounded-2xl overflow-hidden bg-black ring-1 ring-white/10 shadow-2xl group-hover:ring-white/20 transition-all`}>
                  {project.youtubeId ? (
                    <iframe
                      className="absolute inset-0 w-full h-full pointer-events-auto"
                      src={`https://www.youtube.com/embed/${project.youtubeId}?modestbranding=1&rel=0`}
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : project.playlistId ? (
                    <a href={`https://www.youtube.com/playlist?list=${project.playlistId}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 w-full h-full block group/link">
                      {project.thumbnail && (
                        <Image src={project.thumbnail} alt={project.title} fill className="object-cover group-hover/link:scale-105 transition-transform duration-500" />
                      )}
                      <div className="absolute inset-0 bg-black/40 group-hover/link:bg-black/20 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white shadow-2xl transform group-hover/link:scale-110 transition-transform">
                          <Play size={28} fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white font-semibold border border-white/10 flex items-center gap-2">
                        <FaYoutube size={14} className="text-red-500" />
                        Playlist Completa
                      </div>
                    </a>
                  ) : project.shortsId ? (
                    <iframe
                      className="absolute inset-0 w-full h-full pointer-events-auto"
                      src={`https://www.youtube.com/embed/${project.shortsId}?modestbranding=1&rel=0`}
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : project.instagramId ? (
                    <iframe
                      className="absolute inset-0 w-full h-full pointer-events-auto bg-white"
                      src={`https://www.instagram.com/p/${project.instagramId}/embed`}
                      title={project.title}
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency={true}
                      allow="encrypted-media"
                    ></iframe>
                  ) : project.tiktokId ? (
                    <iframe
                      className="absolute inset-0 w-full h-full pointer-events-auto bg-white"
                      src={`https://www.tiktok.com/embed/${project.tiktokId}`}
                      title={project.title}
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency={true}
                      allow="encrypted-media"
                    ></iframe>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="text-white w-8 h-8" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Shorts Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4">
            Meus <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Shorts</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Conteúdo vertical viral em formato curto
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {shorts.map((short, i) => (
            <motion.div
              key={short.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-[300px] sm:h-[400px]"
            >
              {/* Background com gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br from-red-600/30 to-orange-600/30 group-hover:from-red-500/50 group-hover:to-orange-500/50 transition-all duration-500 z-0`} />

              {/* Container do vídeo em 9:16 */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black ring-1 ring-white/10 shadow-2xl group-hover:ring-white/20 transition-all">
                {short.tiktokId ? (
                  <iframe
                    className="absolute inset-0 w-full h-full pointer-events-auto"
                    src={`https://www.tiktok.com/embed/${short.tiktokId}`}
                    title={short.title}
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                    allow="encrypted-media"
                  ></iframe>
                ) : short.youtubeShortId ? (
                  <iframe
                    className="absolute inset-0 w-full h-full pointer-events-auto"
                    src={`https://www.youtube.com/embed/${short.youtubeShortId}?modestbranding=1&rel=0`}
                    title={short.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : short.instagramId ? (
                  <iframe
                    className="absolute inset-0 w-full h-full pointer-events-auto bg-white"
                    src={`https://www.instagram.com/p/${short.instagramId}/embed`}
                    title={short.title}
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                    allow="encrypted-media"
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="text-white w-8 h-8" />
                  </div>
                )}
              </div>

              {/* Info Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col justify-end p-4 z-10"
              >
                <div className="backdrop-blur-md bg-black/50 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Play size={12} className="text-red-500" />
                    <span className="text-white text-xs font-bold">{short.views} views</span>
                  </div>
                  <p className="text-white text-xs font-medium line-clamp-1">{short.title}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Redes Sociais Metrics */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4">
            Minhas <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-500">Redes</span>
          </h2>
          <p className="text-gray-400 text-lg">O impacto dos meus conteúdos em cada plataforma.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {networkStats.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-slate-800/50 hover:border-red-500/30 transition-all relative overflow-hidden group"
            >
              <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${item.color} rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity`} />
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center ${item.textColor} mb-6 relative z-10 border border-white/10`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
              <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 mb-2">{item.followers}</p>
              <p className="text-gray-400 text-sm font-medium">{item.metric}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2"
              >
                {stat.number}
              </motion.div>
              <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Cupons de Parceiros */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4">
            Meus <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Cupons</span>
          </h2>
          <p className="text-gray-400 text-lg">Aproveite os descontos exclusivos com meus parceiros.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coupons.map((coupon, i) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-900 to-black border border-dashed border-red-500/30 rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden group hover:border-red-500/60 transition-colors"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/10 rounded-full blur-xl group-hover:bg-red-500/20 transition-all" />
              <Ticket size={24} className="text-red-500 mb-4" />
              <h3 className="text-2xl font-black text-white mb-1">{coupon.brand}</h3>
              <p className="text-red-400 font-bold text-xl mb-6">{coupon.discount}</p>
              <div className="bg-black/50 border border-white/10 rounded-lg px-6 py-3 mb-6 w-full border-dashed">
                <span className="text-white font-mono tracking-widest text-lg">{coupon.code}</span>
              </div>
              <motion.a
                href={coupon.link}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-semibold text-white bg-red-600 hover:bg-red-500 px-6 py-3 rounded-full transition-colors w-full uppercase tracking-wider"
              >
                Usar Cupom
              </motion.a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <motion.div
                className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-medium"
              >
                ✨ SOBRE MIM
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
                Criador de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Conteúdo</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Com mais de 2 anos de experiência criando conteúdo viral, especializado em reels, shorts e
                transmissões ao vivo. Meu objetivo é criar conteúdo autêntico que inspire e divirta minha comunidade.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all"
              >
                Saber Mais
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-full aspect-square bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl border border-red-500/20 flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-500 to-orange-500 opacity-20 blur-3xl"
              />
              <motion.div
                variants={floatingVariants}
                animate="float"
                className="relative text-6xl"
              >
                📱
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border border-slate-700/50 rounded-3xl p-12 md:p-20 text-center backdrop-blur relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-red-500 to-rose-600" />
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4">
            Vamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Collab?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Estou sempre aberto para colaborações, parcerias e novos projetos. Vamos criar algo incrível juntos!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all"
            >
              Enviar Email
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-gray-600 text-white rounded-lg font-semibold hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 transition-all"
            >
              WhatsApp
            </motion.button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 pt-8 border-t border-gray-700">
            <motion.a
              href="https://www.instagram.com/samuelbola_/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white hover:shadow-lg hover:shadow-red-500/50 transition-all"
            >
              <FaInstagram size={24} />
            </motion.a>
            <motion.a
              href="https://twitter.com/seuperfil"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white hover:shadow-lg hover:shadow-red-500/50 transition-all"
            >
              <FaTwitter size={24} />
            </motion.a>
            <motion.a
              href="https://www.youtube.com/@samuelbolaa"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white hover:shadow-lg hover:shadow-red-500/50 transition-all"
            >
              <FaYoutube size={24} />
            </motion.a>
            <motion.a
              href="https://twitch.tv/seucanal"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white hover:shadow-lg hover:shadow-red-500/50 transition-all"
            >
              <FaTwitch size={24} />
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p className="mb-2">© 2026 Samuel. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}