import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check,
    Circle,
    ChevronRight,
    type LucideIcon
} from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-900';

    const variants = {
        primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 active:scale-[0.98]',
        secondary: 'bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-100 hover:bg-dark-200 dark:hover:bg-dark-600 active:scale-[0.98]',
        ghost: 'text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 active:scale-[0.98]',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm gap-1.5',
        md: 'px-5 py-2.5 text-base gap-2',
        lg: 'px-7 py-3 text-lg gap-2.5',
    };

    return (
        <motion.button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled || loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={disabled || loading}
            whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
            {...props}
        >
            {loading ? (
                <motion.div
                    className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
            ) : (
                <>
                    {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
                    {children}
                    {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
                </>
            )}
        </motion.button>
    );
}

interface ProgressBarProps {
    value: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    color?: 'primary' | 'success' | 'warning' | 'danger';
    className?: string;
}

export function ProgressBar({
    value,
    max = 100,
    size = 'md',
    showLabel = false,
    color = 'primary',
    className = '',
}: ProgressBarProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const sizes = {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
    };

    const colors = {
        primary: 'from-primary-500 to-accent-cyan',
        success: 'from-emerald-500 to-accent-emerald',
        warning: 'from-amber-500 to-accent-amber',
        danger: 'from-red-500 to-red-400',
    };

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex justify-between mb-1 text-sm text-dark-600 dark:text-dark-400">
                    <span>Progress</span>
                    <span>{Math.round(percentage)}%</span>
                </div>
            )}
            <div className={`w-full rounded-full bg-dark-200 dark:bg-dark-700 overflow-hidden ${sizes[size]}`}>
                <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${colors[color]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
}

interface TagProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md';
    className?: string;
}

export function Tag({
    children,
    variant = 'default',
    size = 'md',
    className = ''
}: TagProps) {
    const variants = {
        default: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
        success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
        warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
        danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
        info: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
    };

    return (
        <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
            {children}
        </span>
    );
}

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
}

export function Checkbox({ checked, onChange, label, disabled = false }: CheckboxProps) {
    return (
        <label className={`inline-flex items-center gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <motion.button
                type="button"
                onClick={() => !disabled && onChange(!checked)}
                className={`
          w-5 h-5 rounded-md border-2 flex items-center justify-center
          transition-colors duration-200
          ${checked
                        ? 'bg-primary-500 border-primary-500'
                        : 'border-dark-300 dark:border-dark-600 hover:border-primary-400'
                    }
        `}
                whileTap={!disabled ? { scale: 0.9 } : undefined}
                disabled={disabled}
            >
                <AnimatePresence>
                    {checked && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <Check className="w-3.5 h-3.5 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
            {label && (
                <span className="text-dark-700 dark:text-dark-200">{label}</span>
            )}
        </label>
    );
}

interface RadioGroupProps {
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    name: string;
}

export function RadioGroup({ options, value, onChange, name }: RadioGroupProps) {
    return (
        <div className="space-y-2">
            {options.map((option) => (
                <label
                    key={option.value}
                    className="inline-flex items-center gap-3 cursor-pointer"
                >
                    <motion.button
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center
              transition-colors duration-200
              ${value === option.value
                                ? 'border-primary-500'
                                : 'border-dark-300 dark:border-dark-600 hover:border-primary-400'
                            }
            `}
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence>
                            {value === option.value && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="w-2.5 h-2.5 rounded-full bg-primary-500"
                                />
                            )}
                        </AnimatePresence>
                    </motion.button>
                    <span className="text-dark-700 dark:text-dark-200">{option.label}</span>
                </label>
            ))}
        </div>
    );
}

interface AccordionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    icon?: LucideIcon;
}

export function Accordion({ title, children, defaultOpen = false, icon: Icon }: AccordionProps) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
        <div className="border border-dark-200 dark:border-dark-700 rounded-xl overflow-hidden">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left
                   bg-dark-50 dark:bg-dark-800 hover:bg-dark-100 dark:hover:bg-dark-700
                   transition-colors"
            >
                <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-5 h-5 text-primary-500" />}
                    <span className="font-medium text-dark-800 dark:text-dark-100">{title}</span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronRight className="w-5 h-5 text-dark-500" />
                </motion.div>
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-4 border-t border-dark-200 dark:border-dark-700">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
