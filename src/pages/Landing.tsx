
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  BarChart2, 
  Shield, 
  ChevronDown, 
  ArrowRight,
  AreaChart,
  PieChart,
  LineChart,
  Heart,
  Play,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Repeat,
  Share,
  BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/PageHeader';
import { PageFooter } from '@/components/PageFooter';
import { AuthModal } from '@/components/AuthModal';

const Landing = () => {
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleTryNow = () => {
    navigate('/dashboard');
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const openLoginModal = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };
  
  const openSignupModal = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader 
        transparent={true} 
        onLoginClick={openLoginModal}
        onSignupClick={openSignupModal}
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-950 dark:via-pink-950 dark:to-indigo-950 z-0" />
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-purple-500/20 rounded-full"
              style={{
                width: Math.random() * 30 + 10,
                height: Math.random() * 30 + 10,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"
              >
                <MessageCircle className="h-10 w-10 text-white" />
              </motion.div>
            </div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              SocialScan
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              Identify and classify toxic content in social media posts with advanced AI tools.
              Monitor, analyze, and take action on problematic social media content.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('learn-more')}
                className="border border-purple-500/30 hover:bg-purple-500/5"
              >
                Learn More
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg"
                onClick={handleTryNow}
                className="group bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                Try It Now
                <Play className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection('learn-more')}
            className="animate-bounce"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </section>

      {/* What We Do Section */}
      <section id="learn-more" className="py-20 px-4 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-purple-950/50 dark:via-indigo-950/50 dark:to-pink-950/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
            >
              What We Do
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mb-8"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-end"
            >
              <div className="p-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 shadow-xl mb-8">
                <Heart className="h-20 w-20 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center md:text-right">Protecting Online Communities</h3>
              <p className="text-muted-foreground text-center md:text-right">
                We help identify and filter harmful content on social media platforms, 
                creating safer online spaces for all users. Our advanced AI tools detect 
                toxic comments, threats, and obscene content before they cause harm.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="p-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-xl mb-8">
                <TrendingUp className="h-20 w-20 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center md:text-left">Data-Driven Insights</h3>
              <p className="text-muted-foreground text-center md:text-left">
                Transform raw social media data into actionable insights with our 
                powerful analytics tools. Monitor trends, track sentiment changes over time, 
                and get comprehensive reports on content classification to make informed decisions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              How It Works
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageCircle className="h-8 w-8 text-purple-500" />,
                title: "Scan Posts",
                description: "Enter a URL or topic and our system will scan relevant social media posts for analysis."
              },
              {
                icon: <Shield className="h-8 w-8 text-purple-500" />,
                title: "AI Classification",
                description: "Advanced machine learning algorithms classify posts into categories like toxic, threat, or obscene."
              },
              {
                icon: <BarChart2 className="h-8 w-8 text-purple-500" />,
                title: "Visualize Results",
                description: "Interactive charts and data visualizations help you understand trends and patterns."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                viewport={{ once: true }}
                className="social-card hover:shadow-lg transition-all bg-gradient-to-br from-card to-secondary/30"
              >
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-3 rounded-full w-fit mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Analytics Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-secondary/50 to-background dark:from-secondary/10 dark:to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              Social Media Analytics
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
            >
              Real-time monitoring and classification of social media content
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <PieChart className="h-8 w-8 text-white" />,
                title: "Content Classification",
                description: "AI-powered classification of content into multiple categories.",
                chart: (
                  <div className="relative w-32 h-32 mx-auto rounded-full bg-secondary">
                    <div className="absolute inset-[15%] rounded-full bg-white dark:bg-gray-800"></div>
                    <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-500 rounded-tl-full"></div>
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-pink-500 rounded-tr-full"></div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500 rounded-bl-full"></div>
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-green-500 rounded-br-full"></div>
                  </div>
                )
              },
              {
                icon: <AreaChart className="h-8 w-8 text-white" />,
                title: "Content Monitoring",
                description: "Real-time dashboard for monitoring problematic content.",
                chart: (
                  <div className="w-full h-32 relative mx-auto">
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border"></div>
                    <div className="absolute left-0 bottom-0 top-0 w-[1px] bg-border"></div>
                    <div className="absolute bottom-0 left-2 right-2 h-20 flex items-end">
                      {[35, 55, 45, 60, 48, 40, 30].map((h, i) => (
                        <div key={i} className="flex-1 mx-1">
                          <div 
                            className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm"
                            style={{ height: `${h}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              },
              {
                icon: <BarChart className="h-8 w-8 text-white" />,
                title: "Content Categories",
                description: "Compare different content types across your social media.",
                chart: (
                  <div className="w-full max-w-xs mx-auto space-y-3">
                    {[
                      { label: 'Toxic', value: 65, color: 'bg-red-500' },
                      { label: 'Threats', value: 40, color: 'bg-orange-500' },
                      { label: 'Obscene', value: 55, color: 'bg-purple-500' },
                      { label: 'Neutral', value: 75, color: 'bg-blue-500' }
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{item.label}</span>
                          <span>{item.value}%</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.color} rounded-full`}
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                viewport={{ once: true }}
                className="p-6 rounded-xl hover:shadow-lg transition-all backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/1 border border-border"
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full w-fit mb-4 mx-auto">
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{item.title}</h3>
                <p className="text-muted-foreground text-center mb-6">{item.description}</p>
                <div className="h-[150px] flex items-center justify-center">
                  {item.chart}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Examples Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              Content Analysis Examples
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                username: "@user123",
                text: "This new product is absolutely terrible! I want my money back immediately. #angry #refund",
                classification: "Toxic",
                confidence: 87,
                color: "bg-red-500"
              },
              {
                username: "@jane_doe",
                text: "Just had the most amazing customer service experience! The team went above and beyond to help me. #grateful",
                classification: "Neutral",
                confidence: 95,
                color: "bg-blue-500"
              },
              {
                username: "@tech_guy",
                text: "The explicit content in this post is inappropriate. Please delete this immediately.",
                classification: "Obscene",
                confidence: 81,
                color: "bg-purple-500"
              },
              {
                username: "@angry_customer",
                text: "I'm going to make you pay for what you did. You better watch your back.",
                classification: "Threat",
                confidence: 92,
                color: "bg-orange-500"
              }
            ].map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                viewport={{ once: true }}
                className="social-card p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {post.username.charAt(1).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{post.username}</p>
                      <div className={`px-2 py-1 rounded-full text-xs text-white ${post.color}`}>
                        {post.classification} ({post.confidence}%)
                      </div>
                    </div>
                    <p className="mt-2 text-foreground">{post.text}</p>
                    <div className="mt-4 flex justify-between text-muted-foreground">
                      <div className="flex space-x-4">
                        <button className="upvote-button flex items-center gap-1">
                          <ThumbsUp size={16} />
                          <span className="text-xs">128</span>
                        </button>
                        <button className="downvote-button flex items-center gap-1">
                          <ThumbsDown size={16} />
                          <span className="text-xs">24</span>
                        </button>
                      </div>
                      <div className="flex space-x-4">
                        <button className="text-muted-foreground hover:text-purple-500 transition-colors">
                          <Repeat size={16} />
                        </button>
                        <button className="text-muted-foreground hover:text-purple-500 transition-colors">
                          <Share size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-purple-950/50 dark:via-indigo-950/50 dark:to-pink-950/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              Benefits
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
            >
              Our SocialScan platform offers powerful tools to monitor and analyze social media content
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              "Identify toxic comments before they cause harm",
              "Monitor your brand's social media presence",
              "Improve community moderation with data-driven insights",
              "Protect users from harmful content"
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="rounded-full p-1 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-lg">{benefit}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      <PageFooter />
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialMode={authMode}
      />
    </div>
  );
};

export default Landing;
