// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// import Head from "next/head";
// import styles from "../../styles/Home.module.css";
// import FormCard from '../src/components/FormCard.js';

// export default function Forms() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [forms, setForms] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     // Check authentication status here
//     const isAuthenticated = true; // Replace this with real authentication check
//     if (!isAuthenticated) {
//       router.push("/login");
//     } else {
//       fetchForms();
//     }
//   }, [router]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post("/api/forms", { title, description });
//       console.log("Form submitted successfully:", response.data);
//       setTitle('');
//       setDescription('');
//       fetchForms(); // Fetch forms again to include the newly added form
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   const fetchForms = async () => {
//     try {
//       const response = await axios.get('/api/forms');
//       setForms(response.data);
//     } catch (error) {
//       console.error("Error fetching forms:", error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Form Management</title>
//         <meta name="description" content="Form Management Page" />
//       </Head>

//       <main className={styles.main}>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//           <button type="submit">Submit</button>
//         </form>

//         <div className={styles.cardContainer}>
//           {forms.map((form) => (
//             <FormCard key={form.id} form={form} />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }
