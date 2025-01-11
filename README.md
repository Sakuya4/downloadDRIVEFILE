# 載Google Drive含保全的PDF檔案
載含保全之Google_Drive的pdf

將Script丟到`Console`按`Enter`就可以將整份PDF打包，

## 說明 
1.  使用 trustedTypes API (if 瀏覽器Support)，載入 jsPDF.
2.  在 jsPDF函式庫載入完成後，遍歷網頁上所有的img元素，並且檢查圖片來源是否為blob。
3.  如果圖片來源符合規範，則會將圖片繪製到 canvas 上，並轉換成 JPEG 格式的 Data URL。
4.  使用jsPDF函式庫，將圖片加入 PDF 文件中，並且動態設定圖片大小，確保圖片置中且在 A4 大小頁面中。
5.  最後，將 PDF 文件儲存為 Example.pdf。


