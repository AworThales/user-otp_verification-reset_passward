// converting image to base 64
export function convertImageToBase64(file){
    // is goint to return a promose
    return new Promise((resolve, reject) =>{
        // creating instance of file reader and asign it to variable
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        // when the file is load call this function
        fileReader.onload = () => {
            // return a result promise
            resolve(fileReader.result);
        }

        // if there's error call the filReader on error and retur eror mgs
        fileReader.onerror = (error) => {
            reject(error);
        }

    })
}
