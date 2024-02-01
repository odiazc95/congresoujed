import '../assets/css/card_plantillas.css';

function CardPlantilla() {
  const pdfUrl = 'https://docdro.id/2G6Sfew';

  return (
    <div className="container_cardPlantilla">
      <b><p className="Name_plantilla">Plantilla reportes UJED</p></b>
      <span className="Desc_plantilla">Plantilla para realizar reportes referente a lo sucedido dentro de cada congreso</span>
      <iframe src={pdfUrl} width="100%" height="500px" title="PDF Preview"  />
    </div>
  )
}

export default CardPlantilla;
