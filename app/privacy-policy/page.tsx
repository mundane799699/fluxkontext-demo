"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Eye,
  Lock,
  Database,
  Globe,
  Mail,
} from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how
            FluxContext collects, uses, and protects your information.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Information We Collect */}
            <section>
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Information We Collect
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-800">
                  Personal Information
                </h3>
                <p>
                  When you use FluxContext, we may collect the following types
                  of personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Email address and authentication credentials</li>
                  <li>
                    Payment information for credit purchases (processed securely
                    through Stripe)
                  </li>
                  <li>Images you upload for processing</li>
                  <li>Usage data and preferences</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6">
                  Automatic Information
                </h3>
                <p>
                  We automatically collect certain information when you visit
                  our website:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Usage patterns and analytics</li>
                </ul>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  How We Use Your Information
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We use your information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    To provide and improve our AI image enhancement services
                  </li>
                  <li>To process your payments and manage your account</li>
                  <li>
                    To communicate with you about your account and our services
                  </li>
                  <li>
                    To provide customer support and respond to your inquiries
                  </li>
                  <li>To analyze usage patterns and improve our platform</li>
                  <li>
                    To comply with legal obligations and protect our rights
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Data Security
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  We implement robust security measures to protect your personal
                  information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All data is encrypted in transit and at rest</li>
                  <li>Secure payment processing through Stripe</li>
                  <li>Regular security audits and updates</li>
                  <li>
                    Limited access to personal data on a need-to-know basis
                  </li>
                  <li>
                    Secure cloud storage with industry-standard protections
                  </li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-800">
                    <strong>Image Processing:</strong> Your uploaded images are
                    processed using our FLUX KONTEXT AI technology and are
                    automatically deleted from our servers after processing is
                    complete, unless you choose to save them to your account.
                  </p>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <div className="flex items-center mb-4">
                <Globe className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Information Sharing
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties, except in the following
                  circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Service Providers:</strong> We work with trusted
                    third-party services (such as Stripe for payments) that help
                    us operate our platform
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose
                    information when required by law or to protect our rights
                    and safety
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In the event of a
                    merger, acquisition, or sale of assets, your information may
                    be transferred
                  </li>
                </ul>
                <p className="mt-4">
                  All third-party service providers are contractually bound to
                  protect your information and use it only for the specified
                  purposes.
                </p>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Privacy Rights
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  You have the following rights regarding your personal
                  information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Access:</strong> Request a copy of the personal
                    information we hold about you
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of
                    inaccurate or incomplete information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal
                    information (subject to legal requirements)
                  </li>
                  <li>
                    <strong>Portability:</strong> Request transfer of your data
                    to another service
                  </li>
                  <li>
                    <strong>Opt-out:</strong> Unsubscribe from marketing
                    communications at any time
                  </li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us using the
                  information provided below.
                </p>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <div className="space-y-4 text-gray-700">
                <h2 className="text-2xl font-bold text-gray-900">
                  Cookies and Tracking
                </h2>
                <p>
                  We use cookies and similar technologies to enhance your
                  experience on our website:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Essential Cookies:</strong> Required for basic
                    website functionality
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Help us understand how
                    you use our service
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> Remember your settings
                    and preferences
                  </li>
                </ul>
                <p className="mt-4">
                  You can control cookie settings through your browser
                  preferences. However, disabling certain cookies may affect
                  website functionality.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <div className="space-y-4 text-gray-700">
                <h2 className="text-2xl font-bold text-gray-900">
                  Children's Privacy
                </h2>
                <p>
                  FluxContext is not intended for use by children under the age
                  of 13. We do not knowingly collect personal information from
                  children under 13. If we become aware that we have collected
                  personal information from a child under 13, we will take steps
                  to delete such information.
                </p>
              </div>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <div className="space-y-4 text-gray-700">
                <h2 className="text-2xl font-bold text-gray-900">
                  Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any material changes by posting the new Privacy
                  Policy on this page and updating the "Last updated" date. We
                  encourage you to review this Privacy Policy periodically to
                  stay informed about how we protect your information.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="border-t border-gray-200 pt-8">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  If you have any questions about this Privacy Policy or our
                  privacy practices, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong> privacy@fluxcontext.top
                    </p>
                    <p>
                      <strong>Website:</strong>{" "}
                      <Link
                        href="/"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        fluxcontext.top
                      </Link>
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  We will respond to your inquiry within 30 days of receiving
                  your request.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to FluxContext
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
