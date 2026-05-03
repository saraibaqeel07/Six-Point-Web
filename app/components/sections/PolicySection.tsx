// components/PolicySection.tsx
"use client";

import React from "react";

const PolicySection = () => {
  return (
    <div className="bg-[#1D1818] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[90%] mx-auto">
        {/* Header / Club Info */}
        <div className=" mb-10">
          <p>Sixth Point Jiu-Jitsu Club LLC</p>
          <p className=" text-white">Abu Dhabi, United Arab Emirates</p>
          <div className=" text-white ">
            <p>
              {" "}
              <strong>Trade License No.:</strong> CN-6372019
            </p>
            <p>
              {" "}
              <strong>Effective Date:</strong> ____________________
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-10 text-white leading-relaxed">
          {/* 1. DEFINITIONS */}
          <section>
            <h2 className="text-lg font-semibold uppercase tracking-wide mb-4 pb-2">
              1. DEFINITIONS
            </h2>

            <ol className="list-none pl-6 text-sm space-y-3 text-white">
              <li>
                <span className="font-medium mr-2">1.1</span>
                "Studio" Refers To Sixth Point Jiu-Jitsu Studio, Operating In
                Abu Dhabi, United Arab Emirates.
              </li>

              <li>
                <span className="font-medium mr-2">1.2</span>
                "Member" Refers To Any Individual Who Has An Active Membership
                Agreement With The Studio.
              </li>

              <li>
                <span className="font-medium mr-2">1.3</span>
                "Membership Perks" or{" "}
                <span className="font-semibold">"Perks"</span> Refers To Any
                Additional Benefits, Privileges, Discounts, Or Services Offered
                To Members Beyond Standard Class Access.
              </li>

              <li>
                <span className="font-medium mr-2">1.4</span>
                "UAE" Refers To The United Arab Emirates.
              </li>
            </ol>
          </section>
          {/* 2. ELIGIBILITY */}
          <section>
            <h2 className="text-lg font-semibold uppercase tracking-wide mb-4 pb-2">
              2. ELIGIBILITY
            </h2>

            <ol className="list-none pl-6 text-sm space-y-3 text-white">
              <li>
                <span className="font-medium mr-2">2.1</span>
                Membership Perks Are Exclusively To Members With An Active,
                Valid, And Fully Paid Membership.
              </li>
            </ol>
          </section>

          {/* 3. AVAILABILITY AND MODIFICATIONS */}
          <section>
            <h2 className="text-lg font-semibold uppercase tracking-wide mb-4 pb-2">
              3. AVAILABILITY AND MODIFICATIONS
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium mr-2">3.1</span>
                The Club Management Reserves The Right To:
              </p>
              <ul className="list-disc text-sm pl-6 space-y-2 text-white">
                <li>Modify, Suspend, Or Discontinue Any Perk At Any Time.</li>
                <li>
                  Limit Availability Based On Capacity, Scheduling, Or
                  Operational Requirements.
                </li>
                <li>Change Eligibility Criteria.</li>
              </ul>

              <p className="mt-8 text-sm ">
                <span className="font-medium mr-2">3.2</span>
                The Studio Will Make Reasonable Efforts To Notify Members Of
                Significant Changes.
              </p>
              <p className="text-sm ">
                <span className="font-medium mr-2">3.3</span>
                Changes Shall Not Entitle Members To Refunds Or Compensation.
              </p>
            </div>
          </section>

          {/* 4. PARTIES */}
          <section>
            <h2 className="text-lg font-semibold uppercase tracking-wide mb-4">
              2.4. PARTIES
            </h2>
            <p className=" text-sm">
              This Agreement Is Entered Into Between Sixth Point Jiu-Jitsu Club
              LLC ("Club") And The Registered Member. The Club Is A Limited
              Liability Company Licensed And Operating Under The Laws Of Abu
              Dhabi And The United Arab Emirates.
            </p>
          </section>

          {/* Club Contact */}
          <section className=" rounded-lg  mt-4">
            <h3 className="text-lg font-semibold mb-4">Club</h3>
            <div className="space-y-2 text-sm">
              <p>Sixth Point Jiu-Jitsu Club</p>
              <p>Abu Dhabi, United Arab Emirates</p>
              <p>Phone: [Insert]</p>
              <p>Email: [Insert]</p>
            </div>
          </section>


{/* Member Information + Agreement Parties */}
<section className=" rounded-lg mt-8">
  <h3 className="text-xl font-semibold mb-2">AND</h3>

  <h3 className="text-xl font-semibold mb-5">Member</h3>

  <div className="space-y-5 ">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <p className="font-medium">
          Full Name: <span className="">_______________________________________________</span>
        </p>
      </div>
      <div>
        <p className="font-medium">
          Emirates ID No.: <span className="">______________________________</span>
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <p className="font-medium">
          Nationality: <span className="">______________________________</span>
        </p>
      </div>
      <div>
        <p className="font-medium">
          Date of Birth: <span className="">______________________________</span>
        </p>
      </div>
    </div>

    <div>
      <p className="font-medium">
        Address: <span className="">________________________________________________________________</span>
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <p className="font-medium">
          Phone: <span className="">______________________________</span>
        </p>
      </div>
      <div>
        <p className="font-medium">
          Email: <span className="">_______________________________________________</span>
        </p>
      </div>
    </div>
  </div>
</section>

{/* 5. MEMBERSHIP PERKS */}
<section className="mt-12">
  <h2 className="text-lg font-bold uppercase tracking-wide mb-4  pb-2">
    5. MEMBERSHIP PERKS
  </h2>

  <div className="space-y-6  leading-relaxed">
    <p className="font-medium text-white">
      5.1 NON-INVESTMENT DISCLAIMER: Membership Does Not Represent Ownership, Equity, Or Financial Investment In The Club. The Member Is Granted Founders Gold Membership Perks, Which Include The Following Benefits, Subject To The Terms And Conditions Of The Club:
    </p>

    <ul className="list-disc pl-6 space-y-2.5">
      <li>20% Off The Membership Fee Lifetime</li>
      <li>Founders Membership Entitled For Trade Under Management Approval</li>
      <li>1 Apparel Kit Every Membership's Anniversary</li>
      <li>Unlimited Classes</li>
      <li>Seminars Ticket Pre-Sale</li>
      <li>Referral Reward, 10% Of The First Monthly Fee Of The Nominee When Joining The Club</li>
      <li>Referral Reward Cashback Credited In The Member Wallet Redeemable On Club Purchases</li>
    </ul>

    <strong className="text-sm   mt-4">
      These Benefits Remain Valid Only While The Membership Is Active And In Good Standing.
    </strong>
  </div>
</section>

{/* 3. MEMBERSHIP FEES AND PAYMENT */}
<section className="mt-12">
  <h2 className="text-lg font-bold uppercase tracking-wide mb-4  pb-2">
    3. MEMBERSHIP FEES AND PAYMENT
  </h2>

  <div className="space-y-6 ">
    <p>
      3.1 The Member Agrees To Pay The Applicable Membership Fee With A 30% Founders Platinum Discount Applied Over VIP Membership Fee.
    </p>

    <div className=" rounded-lg mt-4">
      <h4 className="text-lg font-semibold mb-4 text-white">3.2 Payment Details:</h4>

      <div className="space-y-4">
        <p>
          <span className="font-medium text-gray-200">Membership Plan:</span>{' '}
          <span className="">______________________________</span>
        </p>

        <p>
          <span className="font-medium text-gray-200">Standard Fee:</span>{' '}
          <span className="">AED ______________________________</span>
        </p>

        <p>
          <span className="font-medium text-gray-200">
            Fee Discount 20% (Reference VIP Fee):
          </span>{' '}
          <span className="">AED ______________________________</span>
        </p>

        <div className="pt-2">
          <p className="font-medium text-gray-200 mb-2">Billing Cycle:</p>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="" readOnly />
              <span>Monthly</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="" readOnly />
              <span>Quarterly</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="" readOnly />
              <span>Annual</span>
            </label>
          </div>
        </div>


{/* 3.3 – 3.5 Payment Rules */}
<div className="mt-6 space-y-3 text-gray-300">
  <p className="text-base">
    <span className=" text-white">3.3</span> Fees Must Be Paid In Advance.
  </p>
  <p className="text-base">
    <span className=" text-white">3.4</span> Failure To Pay Fees Within Seven (7) Days Of The Due Date May Result In Suspension Or Termination Of Membership Benefits.
  </p>
  <p className="text-base">
    <span className=" text-white">3.5</span> All Payments Made Are Subject To UAE Consumer Protection Regulations.
  </p>
</div>

{/* 4. MEMBER WALLET AND REFERRAL REWARDS */}
<section className="mt-12">
  <h2 className="text-lg font-bold uppercase tracking-wide mb-4 pb-2">
    4. MEMBER WALLET AND REFERRAL REWARDS
  </h2>

  <div className="space-y-6 text-gray-300">
    <p>
      4.1 Referral Rewards Shall Be Credited To Member Wallet.
    </p>

    <div>
      <p className="font-medium text-white mb-3">4.2 Member Wallet Credits:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Cannot Be Redeemed For Cash</li>
        <li>Cannot Be Exchanged For Cash Equivalents</li>
        <li>May Be Used For Club Merchandise And Services</li>
        <li>May Be Transferred To Another Associated Member With Management Approval</li>
      </ul>
    </div>

    <p>
      4.3 The Club Reserves The Right To Audit And Adjust Member Wallet Balances Where Necessary.
    </p>
  </div>
</section>

{/* 5. TERM AND CONTINUITY */}
<section className="mt-12">
  <h2 className="text-lg font-bold uppercase tracking-wide mb-4 pb-2">
    5. TERM AND CONTINUITY
  </h2>

  <div className="space-y-4 text-gray-300">
    <p>
      5.1 This Agreement Remains Valid Until Terminated By Either Party.
    </p>
    <p>
      5.2 The Founders Platinum Lifetime Discount Applies Only While Membership Remains Active Without Interruption Exceeding Thirty (30) Days.
    </p>
    <p>
      5.3 If Membership Is Terminated Or Inactive Beyond This Period, Founders Platinum Status May Be Revoked At The Club's Discretion.
    </p>
  </div>
</section>

{/* 6. MEMBERSHIP CANCELLATION & FEE RETENTION POLICY */}
<section className="mt-12">
  <h2 className="text-lg font-bold uppercase tracking-wide mb-4 pb-2">
    6. MEMBERSHIP CANCELLATION & FEE RETENTION POLICY
  </h2>

  <div className="space-y-6 text-gray-300 leading-relaxed">
    <div className=" rounded-lg p-5">
      <p className="font-medium text-white mb-3">
        UAE & Abu Dhabi Compliant
      </p>
      <p>
        This Cancellation And Fee Retention Policy Form An Integral Part Of All Membership Agreements Issued By Sixth Point Jiu-Jitsu Club LLC, Abu Dhabi, United Arab Emirates.
      </p>
      <p className="mt-3">
        By Signing The Membership Agreement Or Using Club Services, The Member Confirms Acceptance Of This Policy.
      </p>
    </div>

   {/* 6. MEMBERSHIP CANCELLATION & FEE RETENTION POLICY (continued) */}

<div className="space-y-10 text-gray-300 leading-relaxed">

  {/* 6.2 GENERAL NO-REFUND POLICY AFTER TRIAL PERIOD */}
  <div>
    <h3 className="text-xl font-semibold text-white mb-4">
      6.2 GENERAL NO-REFUND POLICY AFTER TRIAL PERIOD
    </h3>
    <ol className="list-decimal pl-6 space-y-4">
      <li>
        After Expiration Of The Statutory Trial Period, All Membership Fees Are Strictly Nonrefundable, Except Where Refund Is Required Under Mandatory UAE Law.
      </li>
      <li>
        <span className="font-medium text-gray-100">The Member Acknowledges And Agrees That:</span>
        <ul className="list-disc pl-6 mt-2 space-y-1.5">
          <li>Membership Secures Access, Reservation Of Capacity, And Privilege For Training.</li>
          <li>Pricing Reflects Commitment To The Membership Term.</li>
          <li>Early Termination Does Not Invalidate Payment Obligations.</li>
        </ul>
      </li>
      <li>
        The Member Further Acknowledges That This Is A Premium Limited-Membership Facility, And Cancellation Does Not Entitle The Member To Reimbursement For Unused Time.
      </li>
    </ol>
  </div>

  {/* 6.3 NOTICE REQUIREMENT FOR MONTHLY MEMBERSHIPS */}
  <div>
    <h3 className="text-xl font-semibold text-white mb-4">
      6.3 NOTICE REQUIREMENT FOR MONTHLY MEMBERSHIPS
    </h3>
    <ol className="list-decimal pl-6 space-y-3">
      <li>
        Members On Monthly Billing Plans Must Provide Thirty (30) Days Written Notice To Cancel.
      </li>
      <li>
        Billing Shall Continue During The Notice Period.
      </li>
      <li>
        Failure To Provide Proper Notice May Result In One Additional Billing Cycle.
      </li>
    </ol>
  </div>

  {/* 6.4 PREPAID, PROMOTIONAL & ANNUAL MEMBERSHIPS */}
  <div>
    <h3 className="text-xl font-semibold text-white mb-4">
      6.4 PREPAID, PROMOTIONAL & ANNUAL MEMBERSHIPS
    </h3>
    <ol className="list-none pl-6 space-y-4">
      <li>
        <span className="mr-1">6.4.1</span>
        All Prepaid, Discounted, Promotional, Founding Membership, Or Annual Memberships Are: Non-Refundable, Non-Cancellable For Cash Refund, Non-Prorated.
      </li>
      <li>
        <span className="mr-1">6.4.2</span>

        These Memberships Are Offered At Preferential Pricing In Exchange For Commitment.
      </li>
      <li>
        <span className="mr-1">6.4.3</span>

        <span className="font-medium text-sm">In Lieu Of Refunds, The Club May, At Its Sole Discretion, Offer:</span>
        <ul className="list-disc pl-6 mt-2 space-y-1.5">
          <li>Membership Freeze</li>
          <li>Transfer To Another Person</li>
          <li>Membership Credit</li>
          <li>Upgrade Or Downgrade</li>
        </ul>
      </li>
      <p className="text-sm">
        Extension Of Validity 6.4.4 No Cash Refund Obligation Shall Arise Except Where Required By UAE Law.
      </p>
    </ol>
  </div>

</div>



  </div>
</section>



      </div>
    </div>
  </div>
</section>
        </div>
      </div>
    </div>
  );
};

export default PolicySection;
