import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
};

export function GlassCard({
    children,
    className = '',
    hover = true,
    glow = false,
    padding = 'md',
    ...motionProps
}: GlassCardProps) {
    return (
        <motion.div
            className={`
        glass-card ${paddingClasses[padding]}
        ${glow ? 'shadow-glow' : ''}
        ${className}
      `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            whileHover={hover ? {
                scale: 1.02,
                transition: { duration: 0.2 }
            } : undefined}
            {...motionProps}
        >
            {children}
        </motion.div>
    );
}

interface GlassCardHeaderProps {
    children: ReactNode;
    className?: string;
}

export function GlassCardHeader({ children, className = '' }: GlassCardHeaderProps) {
    return (
        <div className={`mb-4 ${className}`}>
            {children}
        </div>
    );
}

interface GlassCardTitleProps {
    children: ReactNode;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4';
}

export function GlassCardTitle({ children, className = '', as: Tag = 'h3' }: GlassCardTitleProps) {
    return (
        <Tag className={`font-display font-semibold text-dark-900 dark:text-white ${className}`}>
            {children}
        </Tag>
    );
}

interface GlassCardContentProps {
    children: ReactNode;
    className?: string;
}

export function GlassCardContent({ children, className = '' }: GlassCardContentProps) {
    return (
        <div className={`text-dark-600 dark:text-dark-300 ${className}`}>
            {children}
        </div>
    );
}
