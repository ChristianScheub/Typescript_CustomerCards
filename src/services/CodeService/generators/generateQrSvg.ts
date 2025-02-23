import qrcode from "qrcode-generator";
import Logger from "../../Logger/logger";

export const generateQrSvg = (value: string) => {
  const qr = qrcode(0, "M");
  qr.addData(value);
  qr.make();

  const size =  200;
  const svg = qr.createSvgTag({
    cellSize: size / qr.getModuleCount(),
    margin: 0,
    scalable: true,
  });

  Logger.infoService("QR Code generated SVG:" + svg);

  return svg;
};
