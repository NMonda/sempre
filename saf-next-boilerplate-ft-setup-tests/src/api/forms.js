// // pages/api/forms.js
// import fs from 'fs';
// import path from 'path';

// export default function handler(req, res) {
//   if (req.method === "GET") {
//     // Read the forms from a JSON file or a database
//     const filePath = path.join(process.cwd(), "data", "forms.json");
//     const jsonData = fs.readFileSync(filePath);
//     const forms = JSON.parse(jsonData);
    
//     res.status(200).json(forms);
//   } else if (req.method === "POST") {
//     const { title, description } = req.body;

//     // Read existing forms
//     const filePath = path.join(process.cwd(), 'data', 'forms.json');
//     const jsonData = fs.readFileSync(filePath);
//     const forms = JSON.parse(jsonData);

//     // Create a new form
//     const newForm = {
//       id: forms.length + 1,
//       title,
//       description,
//     };

//     // Add the new form to the list
//     forms.push(newForm);

//     // Save the updated forms back to the file
//     fs.writeFileSync(filePath, JSON.stringify(forms, null, 2));

//     res.status(201).json(newForm);
//   } else {
//     res.setHeader("Allow", ["GET", "POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
