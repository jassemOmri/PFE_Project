import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white text-gray-800 py-12 shadow-inner border-t border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-extrabold text-green-600">MarketPlace</h2>
          <p className="text-sm text-gray-600">Découvrez les meilleures offres et profitez d'une expérience d'achat exceptionnelle avec livraison rapide.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-green-500">Liens Rapides</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-green-500 transition">Accueil</a></li>
            <li><a href="#" className="hover:text-green-500 transition">À Propos</a></li>
            <li><a href="#" className="hover:text-green-500 transition">Contact</a></li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-green-500">Contactez-nous</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center space-x-2"><Phone size={18} /> <span>+216 25 742 759</span></li>
            <li className="flex items-center space-x-2"><Mail size={18} /> <span>MarketPlace@gmail.com</span></li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-green-500">Abonnez-vous</h3>
          <p className="text-sm text-gray-600">Restez informé de nos dernières offres et promotions.</p>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Votre email" 
              className="w-full px-3 py-2 rounded-l-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400" 
            />
            <button 
              type="submit" 
              className="bg-green-500 px-4 py-2 rounded-r-lg text-white font-semibold hover:bg-green-400"
            >S'abonner</button>
          </form>
        </motion.div>
      </div>

      <div className="border-t border-gray-200 mt-10 pt-4 text-center w-full">
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} Tous droits réservés - <span className="text-green-600 font-semibold">MarketPlace</span> | Votre destination pour le shopping de qualité.</p>
      </div>
    </footer>
  );
}
