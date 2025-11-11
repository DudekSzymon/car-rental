import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TermsPrivacyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "terms" | "privacy";
}

const termsContent = (
  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
    <section>
      <h3 className="font-semibold text-base mb-2">1. Acceptance of Terms</h3>
      <p className="text-sm text-muted-foreground">
        By accessing and using this car rental service, you accept and agree to
        be bound by the terms and provision of this agreement.
      </p>
    </section>

    <section>
      <h3 className="font-semibold text-base mb-2">2. Use License</h3>
      <p className="text-sm text-muted-foreground">
        Permission is granted to temporarily use our car rental services for
        personal, non-commercial transitory viewing only. This is the grant of a
        license, not a transfer of title.
      </p>
    </section>

    <section>
      <h3 className="font-semibold text-base mb-2">3. Rental Agreement</h3>
      <p className="text-sm text-muted-foreground">
        All car rentals are subject to availability and confirmation. You must
        be at least 21 years of age to rent a vehicle. A valid driver's license
        and credit card are required at the time of rental.
      </p>
    </section>

    <section>
      <h3 className="font-semibold text-base mb-2">4. Payment Terms</h3>
      <p className="text-sm text-muted-foreground">
        Payment is due at the time of booking. We accept major credit cards and
        debit cards. Additional charges may apply for extra services, insurance,
        or late returns.
      </p>
    </section>

    <section>
      <h3 className="font-semibold text-base mb-2">5. Cancellation Policy</h3>
      <p className="text-sm text-muted-foreground">
        Cancellations made 24 hours before the rental period will receive a full
        refund. Cancellations made within 24 hours of the rental period are
        subject to a cancellation fee.
      </p>
    </section>

    <section>
      <h3 className="font-semibold text-base mb-2">6. Vehicle Use</h3>
      <p className="text-sm text-muted-foreground">
        Vehicles must be used in accordance with local traffic laws. The renter
        is responsible for any damage, traffic violations, or parking tickets
        incurred during the rental period.
      </p>
    </section>

    <section>
      <h3 className="font-semibold text-base mb-2">7. Insurance</h3>
      <p className="text-sm text-muted-foreground">
        Basic insurance is included in the rental price. Additional coverage
        options are available at the time of booking. You are responsible for
        the deductible in case of an accident.
      </p>
    </section>

    <section>
      <h3 className="font-semibold text-base mb-2">8. Liability</h3>
      <p className="text-sm text-muted-foreground">
        The company shall not be liable for any indirect, incidental, special,
        or consequential damages arising out of or in connection with the use of
        our services.
      </p>
    </section>
  </div>
);

const privacyContent = (
  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
    <section>
      <h3 className="font-semibold text-base mb-2">
        1. Information We Collect
      </h3>
      <p className="text-sm text-muted-foreground">
        We collect information you provide directly to us, including your name,
        email address, phone number, driver's license information, payment
        details, and rental history.
      </p>
    </section>

    <section>
      <h3 className="font-semibold text-base mb-2">
        2. How We Use Your Information
      </h3>
      <p className="text-sm text-muted-foreground">
        We use the information we collect to process your rentals, communicate
        with you, improve our services, and comply with legal obligations.
      </p>
    </section>

    <section>
      <h3 className="font-semibold text-base mb-2">3. Information Sharing</h3>
      <p className="text-sm text-muted-foreground">
        We do not sell or rent your personal information to third parties. We
        may share your information with service providers who assist us in
        operating our business, or when required by law.
      </p>
    </section>

    <section>
      <h3 className="font-semibold text-base mb-2">4. Data Security</h3>
      <p className="text-sm text-muted-foreground">
        We implement appropriate security measures to protect your personal
        information from unauthorized access, alteration, disclosure, or
        destruction.
      </p>
    </section>

    <section>
      <h3 className="font-semibold text-base mb-2">5. Cookies and Tracking</h3>
      <p className="text-sm text-muted-foreground">
        We use cookies and similar tracking technologies to enhance your
        experience on our website, analyze usage patterns, and personalize
        content.
      </p>
    </section>

    <section>
      <h3 className="font-semibold text-base mb-2">6. Your Rights</h3>
      <p className="text-sm text-muted-foreground">
        You have the right to access, update, or delete your personal
        information. You may also opt out of receiving marketing communications
        from us at any time.
      </p>
    </section>

    <section>
      <h3 className="font-semibold text-base mb-2">7. Data Retention</h3>
      <p className="text-sm text-muted-foreground">
        We retain your personal information for as long as necessary to fulfill
        the purposes outlined in this privacy policy, unless a longer retention
        period is required by law.
      </p>
    </section>

    <section>
      <h3 className="font-semibold text-base mb-2">
        8. Changes to Privacy Policy
      </h3>
      <p className="text-sm text-muted-foreground">
        We may update this privacy policy from time to time. We will notify you
        of any changes by posting the new privacy policy on this page and
        updating the effective date.
      </p>
    </section>

    <section>
      <h3 className="font-semibold text-base mb-2">9. Contact Us</h3>
      <p className="text-sm text-muted-foreground">
        If you have any questions about this privacy policy or our data
        practices, please contact us at privacy@carrental.com.
      </p>
    </section>
  </div>
);

export function TermsPrivacyModal({
  open,
  onOpenChange,
  type,
}: TermsPrivacyModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type === "terms" ? "Terms of Service" : "Privacy Policy"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {type === "terms"
              ? "Please read these terms carefully before using our services."
              : "Learn how we collect, use, and protect your personal information."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {type === "terms" ? termsContent : privacyContent}
        <AlertDialogFooter>
          <AlertDialogAction>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
