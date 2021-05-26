import * as Yup from "yup";
import { DateTime } from "luxon";

Yup.addMethod(Yup.date, "format", function (format) {
  return this.transform(function (value, originalValue) {
    if (this.isType(value)) return value;

    //TODO: check validations
    value = DateTime.fromFormat(originalValue, format);

    return value.isValid() ? value.toJSDate() : new Date("");
  });
});

const requiredBoolean = Yup.boolean().required("Must select");
const requiredAccept = Yup.mixed().oneOf(
  [true, "true"],
  "Must read and accept"
);

const requiredEmail = Yup.string()
  .trim()
  .email("Invalid email")
  .required("Required");

const requiredName = Yup.string()
  .min(2, "Too Short!")
  .max(70, "Too Long!")
  .trim()
  .required("Required");

const requiredString = Yup.string().required("Required");

const requiredSelect = Yup.string()
  .notOneOf(["Select..."], "Required")
  .required("Required");

// Synced with dashboard Parent.relationships
const relationshipOptions = [
  { label: "Mother", value: "Mother" },
  { label: "Father", value: "Father" },
  { label: "Step-Mother", value: "Step-Mother" },
  { label: "Step-Father", value: "Step-Father" },
  { label: "Other", value: "Other" },
];

// Synced with dashboard PhoneNumber.types
const phoneNumberTypeOptions = [
  { label: "Mobile", value: "Mobile" },
  { label: "Home", value: "Home" },
  { label: "Office", value: "Office" },
];

// TODO: sync me to PhoneNumber#sanitize
const requiredPhoneNumber = Yup.string()
  .matches(
    /^(\+91-|\+91|0)?\d{10}$/,
    "Phone number needs 10 digits with no dashes"
  )
  .required("Required");

export const overviewFields = [
  { name: "class_type_id", type: "hidden", initialValue: "" },
  { name: "price_shown_to_customer", type: "hidden", initialValue: "" },
  { name: "enrollment_type", type: "hidden", initialValue: "" },
  { name: "addon_ids", type: "custom", initialValue: [] },
  { name: "promo_code", type: "custom", initialValue: "" },
  { name: "promo_amount_off", type: "hidden", initialValue: "" },
  { name: "rewards_redemption_code", type: "custom", initialValue: "" },
  { name: "applied_rewards_amount", type: "custom", initialValue: "" },
  { name: "available_rewards_balance", type: "hidden", initialValue: "" },
];

export const trialField = {
  name: "session_ids",
  label: "Class Session",
  type: "select",
  initialValue: "",
  validator: requiredSelect,
};

export const studentFields = [
  {
    name: "student_first",
    label: "First Name",
    type: "text",
    initialValue: "",
    validator: requiredName,
  },
  {
    name: "student_last",
    label: "Last Name",
    type: "text",
    initialValue: "",
    validator: requiredName,
  },
  {
    name: "student_birthdate",
    label: "Birthdate",
    type: "date",
    initialValue: "",
    placeholder: "mm-dd-yyyy",
    validator: Yup.date()
      .format("MM'-'dd'-'yyyy")
      .typeError("Please provide date in MM-DD-YYYY format")
      .test("test age minimum", "", function (value) {
        const today = DateTime.now();
        const parsedBirthdate = DateTime.fromFormat(value, "MM'-'dd'-'yyyy");
        const age = today.diff(parsedBirthdate).as("years");

        if (age < 5) {
          return this.createError({
            message: "Too young, are you sure that you entered correctly?",
          });
        } else if (age < 5.75) {
          return this.createError({
            message:
              "Typically the youngest we accept is 6, please reach out if you think your child is an exception.",
          });
        } else if (age > 50) {
          return this.createError({
            message:
              "This program is meant for kids, but we appreciate your youthful spirit!",
          });
        } else {
          return true;
        }
      })
      .required("Required date"),
  },
  {
    name: "student_gender",
    label: "Gender",
    type: "gender",
    initialValue: "",
    validator: requiredString,
  },
  {
    name: "student_racial_identity",
    hint:
      "The Coding Space is committed to racial justice and educational equity. This data will primarily be used for internal purposes. We will release a report stripped of all individually identifying data on an annual basis.",
    label:
      "What race/ethnicity best describes your child? Write all that apply.",
    type: "custom-radio",
    initialValue: "",
    options: [],
    validator: requiredString,
  },
  {
    name: "student_school_name",
    label: "School Name",
    type: "text",
    initialValue: "",
    validator: requiredName,
  },
  {
    name: "student_coding_experience",
    label: "Does your child have previous experience coding?",
    type: "radio",
    initialValue: "",
    options: [
      { label: "None", id: "none" },
      {
        label: "Some Experience (Like Scratch or Hour of Code)",
        id: "some",
      },
      { label: "Lots of Scratch Experience", id: "lots_of_scratch" },
      { label: "Javascript", id: "javascript" },
      {
        label: "Other Text - Based Language",
        id: "other_text_based_language",
      },
      { label: "Alumni of The Coding Space", id: "alumni" },
    ],
    validator: requiredString,
  },
  {
    name: "student_shirt_size",
    label: "What size tee shirt does your child wear?",
    type: "radio",
    initialValue: "",
    options: [
      { label: "Child Small", id: "Child Small" },
      { label: "Child Medium", id: "Child Medium" },
      { label: "Child Large", id: "Child Large" },
      { label: "Adult Small", id: "Adult Small" },
      { label: "Adult Medium", id: "Adult Medium" },
      { label: "Adult Large", id: "Adult Large" },
    ],
    validator: requiredString,
  },
];

// Before removing me, make sure student fields above has what it needs
export const covidStudentFields = [
  {
    name: "student_first",
    label: "First Name",
    type: "text",
    initialValue: "",
    validator: requiredName,
  },
  {
    name: "student_last",
    label: "Last Name",
    type: "text",
    initialValue: "",
    validator: requiredName,
  },
  {
    name: "student_birthdate",
    label: "Birthdate",
    type: "date",
    initialValue: "",
    placeholder: "mm-dd-yyyy",
    validator: Yup.date()
      .format("MM-DD-YYYY")
      .typeError("Please provide date in MM-DD-YYYY format")
      .test("test age minimum", "", function (value) {
        const today = DateTime.now();
        const parsedBirthdate = DateTime.fromFormat(value, "MM'-'dd'-'yyyy");
        const age = today.diff(parsedBirthdate).as("years");

        if (age < 5) {
          return this.createError({
            message: "Too young, are you sure that you entered correctly?",
          });
        } else if (age < 5.75) {
          return this.createError({
            message:
              "Typically the youngest we accept is 6, please reach out if you think your child is an exception.",
          });
        } else if (age > 50) {
          return this.createError({
            message:
              "This program is meant for kids, but we appreciate your youthful spirit!",
          });
        } else {
          return true;
        }
      })
      .required("Required date"),
  },
  {
    name: "student_gender",
    label: "Gender",
    type: "gender",
    initialValue: "",
    validator: requiredString,
  },
  {
    name: "student_racial_identity",
    hint:
      "The Coding Space is committed to racial justice and educational equity. This data will primarily be used for internal purposes. We will release a report stripped of all individually identifying data on an annual basis.",
    label:
      "What race/ethnicity best describes your child? Write all that apply.",
    type: "custom-radio",
    initialValue: "",
    options: [],
    validator: requiredString,
  },
  {
    name: "student_school_name",
    label: "School Name",
    type: "text",
    initialValue: "",
    validator: requiredName,
  },
  {
    name: "student_coding_experience",
    label: "Does your child have previous experience coding?",
    type: "radio",
    initialValue: "",
    options: [
      { label: "None", id: "none" },
      {
        label: "Some Experience (Like Scratch or Hour of Code)",
        id: "some",
      },
      { label: "Lots of Scratch Experience", id: "lots_of_scratch" },
      { label: "Javascript", id: "javascript" },
      {
        label: "Other Text - Based Language",
        id: "other_text_based_language",
      },
      { label: "Alumni of The Coding Space", id: "alumni" },
    ],
    validator: requiredString,
  },
  {
    name: "device_type",
    hint:
      "Macs & PCs are strongly preferred for The Coding Space Online. iPads and Tablets are not supported for our online classes.",
    label: "Please select the primary device your child will use",
    type: "select",
    options: [
      { label: "Windows PC/Laptop", value: "Windows PC/Laptop" },
      { label: "Mac", value: "Mac" },
      { label: "Chromebook", value: "Chromebook" },
      { label: "Linux PC/Laptop", value: "Linux PC/Laptop" },
    ],
    validator: requiredSelect,
  },
];

export const parentEmail = {
  name: "parent_email",
  label: "Email",
  type: "text",
  initialValue: "",
  validator: requiredEmail,
};

export const parentFields = [
  {
    name: "parent_first",
    label: "First Name",
    type: "text",
    initialValue: "",
    validator: requiredName,
  },
  {
    name: "parent_last",
    label: "Last Name",
    type: "text",
    initialValue: "",
    validator: requiredName,
  },
  {
    name: "parent_relationship",
    label: "Relationship",
    type: "select",
    initialValue: "",
    options: relationshipOptions,
    validator: requiredSelect,
  },
  parentEmail,
  {
    name: "parent_phone",
    label: "Phone Number",
    type: "text",
    initialValue: "",
    validator: requiredPhoneNumber,
  },
  {
    name: "parent_phone_type",
    label: "Number Type",
    type: "select",
    initialValue: "",
    options: phoneNumberTypeOptions,
    validator: requiredSelect,
  },
  {
    name: "parent_emergency_contact",
    label: "Is Emergency Contact?",
    type: "radio",
    initialValue: "",
    options: [
      { label: "Yes", id: "true" },
      { label: "Use Other", id: "false" },
    ],
    displayRow: true,
    validator: requiredBoolean,
  },
  {
    name: "emergency_first",
    label: "Contact First",
    type: "text",
    initialValue: "",
    displayUnless: "parent_emergency_contact",
    validator: Yup.mixed().when("parent_emergency_contact", {
      is: false,
      then: requiredName,
    }),
  },
  {
    name: "emergency_last",
    label: "Contact Last",
    type: "text",
    initialValue: "",
    displayUnless: "parent_emergency_contact",
    validator: Yup.mixed().when("parent_emergency_contact", {
      is: false,
      then: requiredName,
    }),
  },
  {
    name: "emergency_relationship",
    label: "Relationship",
    type: "select",
    initialValue: "",
    options: relationshipOptions,
    displayUnless: "parent_emergency_contact",
    validator: Yup.string().when("parent_emergency_contact", {
      is: false,
      then: requiredSelect,
    }),
  },
  {
    name: "emergency_phone",
    label: "Contact Phone Number",
    type: "text",
    initialValue: "",
    displayUnless: "parent_emergency_contact",
    validator: Yup.mixed().when("parent_emergency_contact", {
      is: false,
      then: requiredPhoneNumber,
    }),
  },
  {
    name: "emergency_phone_type",
    label: "Contact Number Type",
    type: "select",
    initialValue: "",
    options: phoneNumberTypeOptions,
    displayUnless: "parent_emergency_contact",
    validator: Yup.mixed().when("parent_emergency_contact", {
      is: false,
      then: requiredSelect,
    }),
  },
];

export const billingFields = [
  {
    name: "address1",
    label: "Address 1",
    type: "text",
    initialValue: "",
    validator: requiredString,
  },
  {
    name: "address2",
    label: "Address 2",
    type: "text",
    initialValue: "",
    validator: Yup.string(),
  },
  {
    name: "city",
    label: "City",
    type: "text",
    initialValue: "",
    validator: requiredString,
  },
  {
    name: "state",
    label: "State",
    type: "text",
    initialValue: "",
    validator: Yup.string("Use Abbreviation")
      .min(2, "Too Short!")
      .max(2, "Use Abbreviation")
      .trim()
      .uppercase()
      .required("Required"),
  },
  {
    name: "zip_code",
    label: "Zip Code",
    type: "text",
    initialValue: "",
    validator: Yup.string()
      .matches(/^(\+91-|\+91|0)?\d{5}$/, "5 digit zip code")
      .required("Required"),
  },
];

export const termFields = [
  {
    name: "photo_release",
    label: "Photo Release",
    context:
      "If The Coding Space takes photos during class, I give permission to use these photos.",
    hint:
      "Note: for your privacy, we will never associate your child's name with the photo.",
    type: "radio",
    initialValue: "",
    options: [
      { label: "Yes", id: "true" },
      { label: "No", id: "false" },
    ],
    displayFullWidth: true,
    displayRow: true,
    validator: requiredBoolean,
  },
  {
    name: "acknowledge_refund_policy",
    type: "accept",
    initialValue: false,
    policyName: "Refund Policy",
    policyPath: "/refund_policy",
    prelinkText: "I have read and accept the ",
    hint: "Note: link will open in new tab.",
    displayFullWidth: true,
    displayRow: true,
    validator: requiredAccept,
  },
  {
    name: "accept_liability_release",
    type: "accept",
    initialValue: false,
    policyName: "Liability Release",
    policyPath: "/liability_release",
    prelinkText:
      "I have released The Coding Space of liability as outlined in the ",
    hint: "Note: link will open in new tab.",
    displayFullWidth: true,
    displayRow: true,
    validator: requiredAccept,
  },
  {
    name: "allergies_medications",
    label:
      "Does your child have any allergies or medication we should be aware of?",
    placeholder: "Allergies and/or Medications...",
    type: "textarea",
    initialValue: "",
    displayFullWidth: true,
    validator: Yup.string(),
  },
  {
    name: "student_learning_differences",
    label:
      "Does your child have any learning differences that you would like us to be aware of?",
    placeholder: "Learning differences...",
    type: "textarea",
    initialValue: "",
    displayFullWidth: true,
    validator: Yup.string(),
  },
  {
    name: "additional_details",
    label: "Is there anything else we should know about your child?",
    hint:
      "Note: if you would like your child to be grouped with other class or camp members, please include their full names above. We will do our best to accommodate your request...",
    placeholder: "Additional Details...",
    type: "textarea",
    initialValue: "",
    displayFullWidth: true,
    validator: Yup.string(),
  },
  {
    name: "how_hear",
    label:
      "How did you hear about us? If referred, please include the referral source's full name.",
    placeholder: "Google, Facebook, Friend, etc.",
    type: "textarea",
    initialValue: "",
    displayFullWidth: true,
    validator: Yup.string().required("We'd really like to know!"),
  },
];
