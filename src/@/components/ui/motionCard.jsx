// MotionCard.js
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const MotionCardComponent = motion(Card); // Create a motion-enhanced Card component

const MotionCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div className='cursor-pointer'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }} // Added delay of 0.5 seconds
    >
      <MotionCardComponent  className='rounded-2xl text-center' // Use the new MotionCardComponent
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <CardHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }} // Adjusted delay
          >
            <Icon className="h-8 w-8 mb-2" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.7, duration: 0.5 }} // Adjusted delay
          >
            <CardTitle className='text-4xl font-bold'>{title}</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className='text-2xl'>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.9, duration: 0.5 }} // Adjusted delay
          >
            {description}
          </motion.p>
        </CardContent>
      </MotionCardComponent>
    </motion.div>
  );
};

export default MotionCard;