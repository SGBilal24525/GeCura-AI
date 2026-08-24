
export type SavedItem = {
  id: string;
  title: string;
  source: 'Learning' | 'Smart Answer' | 'AI Doctor' | 'Medicines';
  savedDate: string;
  preview: string;
  content: string;
};

export const allItems: SavedItem[] = [
  {
    id: '1',
    title: 'Mechanism of Action of Metformin',
    source: 'Learning',
    savedDate: '2024-08-10',
    preview: 'Metformin decreases hepatic glucose production, decreases intestinal absorption of glucose, and improves insulin sensitivity...',
    content: `
**Definition:**
Metformin is a first-line medication for the treatment of type 2 diabetes.

**Use in Body:**
It helps control blood sugar levels by affecting glucose production and absorption.

**Short Explanation:**
Metformin works in three main ways: it reduces glucose production in the liver, decreases glucose absorption from the gastrointestinal tract, and enhances insulin sensitivity in peripheral tissues, which allows cells to take up and use glucose more effectively. It does not cause weight gain and has a low risk of hypoglycemia.
    `,
  },
  {
    id: '2',
    title: 'Analysis of a Panadol Box',
    source: 'Medicines',
    savedDate: '2024-08-09',
    preview: 'Medicine Identity: Panadol Extra. Active Ingredients: Paracetamol (500mg), Caffeine (65mg). Medical Usage: For the relief of mild to moderate pain...',
    content: `
**Medicine Identity:**
Panadol Extra Film-Coated Tablets

**Active Ingredients:**
- Paracetamol (Acetaminophen): 500mg
- Caffeine: 65mg

**Medical Usage:**
Used for the relief of mild to moderate pain including headache, migraine, backache, toothache, and rheumatic pain. It is also used to relieve the fever, aches, and pains of colds and flu.

**Mechanism of Action:**
Paracetamol is a pain reliever and fever reducer. Its exact mechanism is not fully understood but is thought to involve inhibition of prostaglandin synthesis in the central nervous system. Caffeine is a mild stimulant that can enhance the analgesic effect of paracetamol.

**Side Effects & Precautions:**
Common side effects are rare but can include allergic reactions. Do not take with other products containing paracetamol. Overdose can cause severe liver damage.
**THIS IS NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE. CONSULT A DOCTOR BEFORE TAKING ANY MEDICATION.**
    `,
  },
  {
    id: '3',
    title: 'AI Consultation: "Mild Headache"',
    source: 'AI Doctor',
    savedDate: '2024-08-08',
    preview: 'Based on your symptoms, a doctor visit is not required at this time. Here is some simple self-care guidance for a mild headache...',
    content: `
**User Input:**
"I have a mild headache since this morning."

---

**AI Analysis & Response:**

**What I Reviewed**
Your report of a mild, short-duration headache.

**Key Findings**
- Symptom: Mild headache
- Duration: Less than 1 day
- No red-flag symptoms reported.

**What It May Mean**
This is likely a tension-type headache, which is very common and usually not serious.

**Recommendation Level:** None

**Advice:**
Based on your symptoms, a doctor visit is not required at this time.
- Rest in a quiet, dark room.
- A cool cloth on your forehead may help.
- Ensure you are well-hydrated.
- Over-the-counter pain relievers like Paracetamol or Ibuprofen can be effective if taken as directed.

**Disclaimer:** This AI assistant does not replace professional medical advice. If your headache worsens, becomes severe, or is accompanied by other symptoms like fever or stiff neck, please seek medical attention.
    `,
  },
  {
    id: '4',
    title: 'Image Analysis: Krebs Cycle Diagram',
    source: 'Smart Answer',
    savedDate: '2024-08-07',
    preview: 'Detected Question: The diagram shows the Krebs Cycle (Citric Acid Cycle). Easy Explanation: Think of the Krebs Cycle as the central powerhouse of the cell...',
    content: `
**Detected Question:**
The user uploaded an image of the Krebs Cycle diagram and asked for an explanation.

**Easy Explanation:**
Think of the Krebs Cycle (or Citric Acid Cycle) as the cell's main engine. It takes a fuel molecule (acetyl-CoA, derived from sugars, fats, and proteins) and, through a series of chemical reactions, generates high-energy molecules (ATP, NADH, FADH2) that power the rest of the cell's activities.

**Medical Explanation:**
The Citric Acid Cycle is a series of enzyme-catalysed chemical reactions that form a key part of aerobic respiration in cells. This cycle occurs in the mitochondrial matrix and its primary function is to oxidize acetyl-CoA into CO2, while capturing the released energy in the form of ATP, NADH, and FADH2.
    `
  },
  {
    id: '5',
    title: 'Concept: Renin-Angiotensin System',
    source: 'Learning',
    savedDate: '2024-08-06',
    preview: 'Ultra-Simple Explanation: Imagine your body has a "blood pressure thermostat". When pressure is low, the kidneys release Renin, starting a chain reaction...',
    content: `
**ultraSimpleExplanation:**
Imagine your body has a "blood pressure thermostat". When pressure is low, the kidneys release a signal called Renin. This starts a chain reaction that produces a powerful hormone called Angiotensin II, which squeezes your blood vessels and tells your body to hold onto salt and water, raising your blood pressure back to normal.

**properMedicalExplanation:**
The Renin-Angiotensin-Aldosterone System (RAAS) is a critical hormone system that regulates blood pressure and fluid balance. When renal blood flow is reduced, juxtaglomerular cells in the kidneys convert prorenin into renin. Renin then cleaves angiotensinogen (produced in the liver) to form angiotensin I. Angiotensin-converting enzyme (ACE), primarily found in the lungs, then converts angiotensin I to angiotensin II, the major bioactive product of the RAAS.

**clinicalValue:**
Understanding the RAAS is fundamental to clinical medicine, especially in cardiology and nephrology. Many of the most effective drugs for treating hypertension (high blood pressure) and heart failure, such as ACE inhibitors (e.g., lisinopril) and Angiotensin II Receptor Blockers (ARBs) (e.g., losartan), work by targeting this pathway.
    `,
  },
  {
    id: '6',
    title: 'AI Consultation: "Fever and Body Pain"',
    source: 'AI Doctor',
    savedDate: '2024-08-05',
    preview: 'Your symptoms don\'t seem to require immediate attention, but if they continue or worsen, consulting a doctor is recommended...',
    content: `
**User Input:**
"I have had a fever and body pain for 3 days."

---

**AI Analysis & Response:**

**What I Reviewed**
Your report of fever and body pain for three days.

**Key Findings**
- Symptoms: Fever, body pain
- Duration: 3 days
- Severity: Not specified, assumed moderate.

**What It May Mean**
Persistent fever can be a sign of an underlying infection that may require medical evaluation.

**Recommendation Level:** optional
**Suggested Specialty:** General Physician

**Advice:**
Your symptoms don't seem to require immediate attention, but if they continue or worsen, consulting a doctor is recommended. Watch for warning signs like a very high fever, difficulty breathing, or a rash.

**Disclaimer:** This AI assistant does not replace professional medical advice.
    `,
  }
];
