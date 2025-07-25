
import React, { useState } from 'react';
import { X, Fingerprint, Zap, Globe, KeyRound, Ban } from 'lucide-react';

interface FeatureItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  text: string;
  iconColor?: string;
}

interface StepItem {
  title: string;
  description: string;
}

interface LinkItem {
  text: string;
  href: string;
}

interface ButtonConfig {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  disabled?: boolean;
}

interface InternetIdentityModalProps {
  isOpen?: boolean;
  onClose?: () => void;

  // Header content
  title?: string;
  subtitle?: string;
  showCloseButton?: boolean;

  // Features section
  features?: FeatureItem[];
  showFeatures?: boolean;

  // Buttons
  buttons?: ButtonConfig[];

  // Footer
  footerText?: string;
  footerLinks?: LinkItem[];
  showFooter?: boolean;

  // Learn more section
  learnMoreText?: string;
  learnMoreLinkText?: string;
  showLearnMore?: boolean;
  howItWorksTitle?: string;
  steps?: StepItem[];

  // Styling
  className?: string;
  backdropClassName?: string;
  modalClassName?: string;
}

const InternetIdentityModal: React.FC<InternetIdentityModalProps> = ({
  isOpen = true,
  onClose = () => { },

  // Header defaults
  title = "Internet Identity",
  subtitle = "Authenticate securely on the Internet Computer",
  showCloseButton = true,

  // Features defaults
  features = [
    { icon: Fingerprint, text: "WebAuth-based security", iconColor: "text-white" },
    { icon: KeyRound, text: "Register multiple devices", iconColor: "text-white" },
    { icon: Globe, text: "Unique identity for each app", iconColor: "text-white" },
    { icon: Zap, text: "No usernames or passwords", iconColor: "text-white" }
  ],
  showFeatures = true,

  // Button defaults
  buttons = [
    {
      text: "Sign In with Internet Identity",
      onClick: () => { },
      variant: 'primary' as const,
      icon: Fingerprint
    },
    {
      text: "Cancel",
      onClick: () => { },
      variant: 'secondary' as const,
      icon: Ban
    }
  ],

  // Footer defaults
  footerText = "By authenticating with Internet Identity, you agree to our",
  footerLinks = [
    { text: "Terms of Service", href: "#" },
    { text: "Privacy Policy", href: "#" }
  ],
  showFooter = true,

  // Learn more defaults
  learnMoreText = "New to Internet Identity?",
  learnMoreLinkText = "Learn more",
  showLearnMore = true,
  howItWorksTitle = "How Internet Identity Works",
  steps = [
    {
      title: "Redirect to service",
      description: "You'll be redirected to the Internet Identity service"
    },
    {
      title: "Authenticate",
      description: "Authenticate using your registered device (biometrics, security key, etc.)"
    },
    {
      title: "Receive identity",
      description: "You'll receive a unique pseudonymous identity for this application"
    },
    {
      title: "Return to app",
      description: "You'll be redirected back to continue your session"
    }
  ],

  // Styling
  className = "",
  backdropClassName = "",
  modalClassName = ""
}) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!isOpen) return null;

  const renderButton = (button: ButtonConfig, index: number) => {
    const Icon = button.icon;
    const baseClasses = "w-full font-medium py-3 px-4 transition-colors flex items-center justify-center gap-2";
    const primaryClasses = "bg-white text-gray-900 hover:bg-gray-100";
    const secondaryClasses = "text-gray-300 hover:border hover:border-white hover:text-white";
    const disabledClasses = "opacity-50 cursor-not-allowed";

    const buttonClasses = `${baseClasses} ${button.variant === 'primary' ? primaryClasses : secondaryClasses
      } ${button.disabled ? disabledClasses : ''}`;

    return (
      <button
        key={index}
        onClick={button.disabled ? undefined : button.onClick}
        disabled={button.disabled}
        className={buttonClasses}
      >
        {Icon && <Icon size={18} />}
        {button.text}
      </button>
    );
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col gap-4 items-center justify-start mx-4 py-4 overflow-y-auto ${className}`}>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm ${backdropClassName}`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative bg-neutral-800 shadow-2xl w-full max-w-lg mx-4 text-white overflow-hidden flex-shrink-0 mt-4 sm:mt-8 ${modalClassName}`}>
        {/* Header */}
        <div className="px-4 sm:px-6 py-5 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              {title && (
                <h2 className="text-lg sm:text-xl font-semibold text-white truncate">{title}</h2>
              )}
              {subtitle && (
                <p className="text-xs sm:text-sm text-gray-400 mt-1">{subtitle}</p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-1 ml-2 sm:ml-4 flex-shrink-0"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Features */}
        {showFeatures && features.length > 0 && (
          <div className="px-4 sm:px-6 py-4 space-y-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <Icon className={feature.iconColor || "text-white"} size={20} />
                  <span className="text-gray-200 text-sm sm:text-base">{feature.text}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Buttons */}
        {buttons.length > 0 && (
          <div className="px-4 sm:px-6 py-4 space-y-3">
            {buttons.map((button, index) => renderButton(button, index))}
          </div>
        )}

        <div className="border-2 border-dashed border-neutral-500 mx-4"></div>

        {/* Footer */}
        {showFooter && (footerText || footerLinks.length > 0) && (
          <div className="px-4 sm:px-6 py-4 text-center text-xs sm:text-sm text-gray-400">
            <p className="leading-relaxed">
              {footerText}
              {footerLinks.length > 0 && footerText && ' '}
              {footerLinks.map((link, index) => (
                <span key={index}>
                  <a href={link.href} className="text-white underline hover:underline">
                    {link.text}
                  </a>
                  {index < footerLinks.length - 1 && ' and '}
                </span>
              ))}
            </p>
          </div>
        )}

        <div className="border-2 border-dashed border-neutral-500 mx-4"></div>

        {/* Learn More Section */}
        {showLearnMore && (
          <div className="px-4 sm:px-6 py-4">
            <div className="text-center mb-4">
              {learnMoreText && (
                <span className="text-gray-400 text-xs sm:text-sm">{learnMoreText} </span>
              )}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-white underline hover:underline text-xs sm:text-sm font-medium"
              >
                {learnMoreLinkText}
              </button>
            </div>

            {showDetails && steps.length > 0 && (
              <div className="bg-gray-800 p-3 sm:p-4 space-y-3 text-xs sm:text-sm">
                {howItWorksTitle && (
                  <h3 className="font-semibold text-white mb-3 text-sm sm:text-base">{howItWorksTitle}</h3>
                )}
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3">
                      <span className="bg-blue-400 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mt-0.5 flex-shrink-0 text-[10px] sm:text-xs">
                        {index + 1}
                      </span>
                      <span className="text-gray-300 leading-relaxed">{step.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* How it Works Card */}
      <div className="relative bg-neutral-900 shadow-2xl w-full max-w-lg mx-4 p-4 sm:p-6 text-white overflow-hidden flex flex-col gap-3 sm:gap-4 flex-shrink-0 mb-4 sm:mb-8">
        <h3 className="text-xl sm:text-2xl text-white font-semibold">How Internet Identity Works</h3>
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="text-sm sm:text-base text-white leading-relaxed">
            <span className="font-medium">1.</span> You&apos;ll be redirected to the Internet Identity service
          </div>
          <div className="text-sm sm:text-base text-white leading-relaxed">
            <span className="font-medium">2.</span> Authenticate using your registered device (biometrics, security key, etc.)
          </div>
          <div className="text-sm sm:text-base text-white leading-relaxed">
            <span className="font-medium">3.</span> You&apos;ll receive a unique pseudonymous identity for this application
          </div>
          <div className="text-sm sm:text-base text-white leading-relaxed">
            <span className="font-medium">4.</span> You&apos;ll be redirected back to continue your session
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternetIdentityModal;