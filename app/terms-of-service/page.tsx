"use client";

import Link from "next/link";
import {
  FileText,
  User,
  CreditCard,
  Shield,
  Image,
  Scale,
  AlertTriangle,
  Mail,
} from "lucide-react";

const TermsOfServicePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these Terms of Service carefully before using
            FluxContext. By using our service, you agree to be bound by these
            terms.
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
            {/* Service Description */}
            <section>
              <div className="flex items-center mb-4">
                <Image className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Service Description
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  FluxContext provides AI-powered online image enhancement
                  services using advanced FLUX KONTEXT technology. Our platform
                  allows users to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Upload and enhance images using AI technology</li>
                  <li>Transform image styles and appearances</li>
                  <li>Process images with various enhancement options</li>
                  <li>Download processed images in high quality</li>
                  <li>Manage credits and account settings</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-800">
                    <strong>Free Credits:</strong> New users receive free
                    credits to try our service. Additional credits can be
                    purchased as needed.
                  </p>
                </div>
              </div>
            </section>

            {/* User Accounts and Responsibilities */}
            <section>
              <div className="flex items-center mb-4">
                <User className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  User Accounts and Responsibilities
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-800">
                  Account Registration
                </h3>
                <p>
                  To use FluxContext, you must create an account by providing
                  accurate and complete information. You are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Maintaining the confidentiality of your account</li>
                  <li>All activities that occur under your account</li>
                  <li>Providing accurate registration information</li>
                  <li>
                    Promptly updating your account information when necessary
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6">
                  Acceptable Use
                </h3>
                <p>You agree not to use FluxContext to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Upload images that violate copyrights or intellectual
                    property rights
                  </li>
                  <li>Process inappropriate, illegal, or harmful content</li>
                  <li>Attempt to reverse engineer our AI technology</li>
                  <li>Abuse our system or attempt unauthorized access</li>
                  <li>
                    Use the service for commercial purposes without permission
                  </li>
                </ul>
              </div>
            </section>

            {/* Payment and Credits */}
            <section>
              <div className="flex items-center mb-4">
                <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Payment and Credits
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-800">
                  Credit System
                </h3>
                <p>
                  FluxContext operates on a credit-based system where each image
                  enhancement costs 1 credit. Key points about credits:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Credits never expire</li>
                  <li>Credits are non-refundable</li>
                  <li>Credits cannot be transferred between accounts</li>
                  <li>Unused credits remain in your account indefinitely</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6">
                  Payments
                </h3>
                <p>
                  All payments are processed securely through Stripe. By making
                  a purchase, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate payment information</li>
                  <li>Pay all charges associated with your account</li>
                  <li>Accept that all sales are final</li>
                  <li>
                    Understand that refunds are not available for purchased
                    credits
                  </li>
                </ul>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-yellow-800">
                    <strong>Refund Policy:</strong> Due to the digital nature of
                    our service and instant delivery of credits, all purchases
                    are final and non-refundable.
                  </p>
                </div>
              </div>
            </section>

            {/* Privacy and Data Usage */}
            <section>
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Privacy and Data Usage
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-800">
                  Image Processing
                </h3>
                <p>When you upload images to FluxContext for enhancement:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Images are processed using our FLUX KONTEXT AI technology
                  </li>
                  <li>
                    Uploaded images are automatically deleted after processing,
                    unless saved to your account
                  </li>
                  <li>
                    We do not use your images to train our AI models without
                    explicit consent
                  </li>
                  <li>
                    Enhanced images can be downloaded and are stored temporarily
                    for your convenience
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6">
                  Data Security
                </h3>
                <p>
                  We implement industry-standard security measures to protect
                  your data and images during processing and storage.
                </p>
                <p className="mt-4">
                  For detailed information about how we collect, use, and
                  protect your personal information, please review our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <div className="flex items-center mb-4">
                <Scale className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Intellectual Property
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-800">
                  Your Content
                </h3>
                <p>
                  You retain ownership of images you upload to FluxContext.
                  However, by using our service, you grant us:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    A limited license to process your images using our AI
                    technology
                  </li>
                  <li>
                    The right to temporarily store images for processing
                    purposes
                  </li>
                  <li>Permission to provide enhanced versions back to you</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6">
                  Our Technology
                </h3>
                <p>
                  FluxContext and FLUX KONTEXT technology, including all
                  associated intellectual property rights, are owned by us. You
                  may not:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Copy, modify, or create derivative works of our service
                  </li>
                  <li>Reverse engineer our AI algorithms</li>
                  <li>Use our technology to create competing services</li>
                  <li>Remove or alter any proprietary notices</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6">
                  Copyright Compliance
                </h3>
                <p>
                  You must ensure that all images you upload do not infringe on
                  third-party copyrights or intellectual property rights. We
                  reserve the right to remove content that violates these terms.
                </p>
              </div>
            </section>

            {/* Disclaimers and Limitations */}
            <section>
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Disclaimers and Limitations
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-800">
                  Service Availability
                </h3>
                <p>
                  While we strive to provide continuous service, FluxContext is
                  provided "as is" without warranties of any kind. We do not
                  guarantee:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Uninterrupted service availability</li>
                  <li>Error-free operation</li>
                  <li>Specific enhancement results</li>
                  <li>Compatibility with all image formats</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6">
                  Limitation of Liability
                </h3>
                <p>
                  To the maximum extent permitted by law, FluxContext shall not
                  be liable for any indirect, incidental, special, or
                  consequential damages arising from your use of the service.
                </p>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                  <p className="text-red-800">
                    <strong>Important:</strong> Our total liability to you for
                    any claims related to FluxContext shall not exceed the
                    amount you paid for credits in the 12 months preceding the
                    claim.
                  </p>
                </div>
              </div>
            </section>

            {/* Service Modifications and Termination */}
            <section>
              <div className="space-y-4 text-gray-700">
                <h2 className="text-2xl font-bold text-gray-900">
                  Service Modifications and Termination
                </h2>
                <h3 className="text-lg font-semibold text-gray-800">
                  Service Changes
                </h3>
                <p>
                  We reserve the right to modify, suspend, or discontinue
                  FluxContext at any time. We will provide reasonable notice of
                  material changes when possible.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6">
                  Account Termination
                </h3>
                <p>
                  We may terminate or suspend your account if you violate these
                  Terms of Service. You may also terminate your account at any
                  time by contacting us.
                </p>
                <p className="mt-4">
                  Upon termination, your right to use FluxContext ceases
                  immediately. Unused credits will be forfeited and cannot be
                  refunded.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <div className="space-y-4 text-gray-700">
                <h2 className="text-2xl font-bold text-gray-900">
                  Governing Law and Disputes
                </h2>
                <p>
                  These Terms of Service are governed by and construed in
                  accordance with applicable laws. Any disputes arising from
                  these terms or your use of FluxContext shall be resolved
                  through binding arbitration.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6">
                  Changes to Terms
                </h3>
                <p>
                  We may update these Terms of Service from time to time. We
                  will notify you of material changes by posting the updated
                  terms on this page and updating the "Last updated" date.
                  Continued use of FluxContext after changes constitutes
                  acceptance of the new terms.
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
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong> support@fluxcontext.top
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
                  We will respond to your inquiry within 48 hours of receiving
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

export default TermsOfServicePage;
