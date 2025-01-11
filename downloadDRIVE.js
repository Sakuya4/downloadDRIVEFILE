// 丟到瀏覽器Console
// 略過google drive保全
// 切勿用於違法用途

let trustedURL;
if(window.trustedTypes && trustedTypes.createPolicy)
{
    const policy = trustedTypes.createPolicy('myPolicy', {createScriptURL:(input) => {return input;}});
    trustedURL = policy.createScriptURL('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
} 
else{trustedURL = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';}

let jspdfScript = document.createElement("script");

jspdfScript.src = trustedURL;
jspdfScript.onload = function()
{
    const{jsPDF} = window.jspdf;
    console.log(jsPDF.version);

    let pdf = new jsPDF();
    let elements = document.getElementsByTagName("img");

    for(let i = 0; i < elements.length; i++)
    {
        let img = elements[i];
        console.log("Processing img:", img);

        if(!/^blob:/.test(img.src))
        {
            console.log("Invalid src:", img.src);
            continue;
        }

        let can = document.createElement('canvas');
        let con = can.getContext("2d");

        // 設定寬高，此比例剛好填滿
        const pdfWidth = 210.0;
        const pdfHeight = 297.0;

        let imgRatio = img.naturalWidth / img.naturalHeight;
        let imgWidth = pdfWidth;
        let imgHeight = pdfWidth / imgRatio;

        if(imgHeight > pdfHeight)
        {
        imgHeight = pdfHeight;
        imgWidth = pdfHeight * imgRatio;
        }

        can.width = img.naturalWidth;
        can.height = img.naturalHeight;

        // 丟到Canvas
        con.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

        // 轉圖片數據
        let imgData = can.toDataURL("image/jpeg", 0.8);

        // 圖片++ && 頁面++
        if(i > 0){pdf.addPage();}
        pdf.addImage(imgData, 'JPEG', (pdfWidth - imgWidth) / 2, (pdfHeight - imgHeight) / 2, imgWidth, imgHeight);
    }

    pdf.save("Example.pdf");
    console.log("Copy成功，產出PDF, Name--> Example.pdf");
};
document.body.appendChild(jspdfScript);
