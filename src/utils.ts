export const convertFileToBase64 = (file: File | undefined) => {
  if (!file) return;

  return new Promise((resolve) => {
    let baseURL: string | ArrayBuffer | null = null;
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};
