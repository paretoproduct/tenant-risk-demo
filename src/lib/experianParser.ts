// Utility functions to parse Experian JSON data

export interface ExperianData {
  // Risk Header
  defaultProbability: string;
  historyStatus: string;
  currentDebt: string;
  unpaidInstallments: string;
  lastDefaultDate: string;
  isJudicial: boolean;
  
  // Risk Reason
  hasDefaults: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  
  // Debt Details
  creditor?: string;
  product?: string;
  paymentHistory?: Array<{ code: string; description: string }>;
  firstDefaultDate?: string;
  registrationDate?: string;
  lastUpdateDate?: string;
  maxDebtAmount?: string;
  postalCode?: string;
}

export function parseExperianJSON(json: any): ExperianData {
  const data = json?.["s:Envelope"]?.["s:Body"]?.["GenerarInformeResponse"]?.["GenerarInformeResult"]?.["InformeDelphi4A3"];
  
  if (!data) {
    throw new Error("Invalid Experian JSON structure");
  }

  const resumenCais = data.ResumenCais || {};
  const informacionDelphi = data.InformacionDelphi || {};
  const direccion = data.DIRECCION || {};
  
  // Get detail operation data if exists
  let detalleOperacion = null;
  try {
    const badexcugRawData = data.badexcugRawData;
    if (badexcugRawData) {
      const parsed = typeof badexcugRawData === 'string' ? JSON.parse(badexcugRawData) : badexcugRawData;
      detalleOperacion = parsed?.TBADEXCUG?.[0]?.TBloqueDetalleOperacion?.[0];
    }
  } catch (e) {
    console.warn("Could not parse badexcugRawData:", e);
  }

  // Parse probability
  const probability = informacionDelphi.ProbabilidadIncumplimientoPorScore || "0";
  
  // Parse history status
  const numOperaciones = resumenCais.NumeroOperacionesImpagadas || "0";
  const hasDefaults = parseInt(numOperaciones) > 0;
  const peorSituacion = resumenCais.PeorSituacionPago_Codigo || "";
  
  let historyStatus = "No defaults registered";
  if (hasDefaults) {
    switch (peorSituacion) {
      case "J":
        historyStatus = "Judicial";
        break;
      case "4":
        historyStatus = "120+ days";
        break;
      case "3":
        historyStatus = "90–120 days";
        break;
      case "2":
        historyStatus = "60–90 days";
        break;
      default:
        historyStatus = "Active default";
    }
  }
  
  const isJudicial = peorSituacion === "J";
  
  // Parse debt amount (prefer ResumenCais, fallback to detail)
  let currentDebt = resumenCais.ImporteImpagado || "0";
  if ((!currentDebt || currentDebt === "0") && detalleOperacion) {
    currentDebt = detalleOperacion.SaldoImpagado || "0";
  }
  
  // Parse installments
  const unpaidInstallments = resumenCais.NumeroCuotasImpagadas || "0";
  
  // Parse last default date
  let lastDefaultDate = "";
  if (detalleOperacion?.FechaUltimoVencimientoImpagado) {
    const fecha = detalleOperacion.FechaUltimoVencimientoImpagado;
    if (fecha.DD && fecha.MM && fecha.AAAA) {
      lastDefaultDate = `${fecha.DD}/${fecha.MM}/${fecha.AAAA}`;
    }
  }
  if (!lastDefaultDate && resumenCais.FechaPeorSituacionPagoHistorica) {
    const fecha = resumenCais.FechaPeorSituacionPagoHistorica;
    if (fecha.DD && fecha.MM && fecha.AAAA && fecha.AAAA !== "0001") {
      lastDefaultDate = `${fecha.DD}/${fecha.MM}/${fecha.AAAA}`;
    }
  }
  
  // Determine risk level
  const probNum = parseFloat(probability);
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  if (probNum >= 20) riskLevel = 'high';
  else if (probNum >= 5) riskLevel = 'medium';
  
  // Parse debt details
  let creditor = "";
  let product = "";
  let paymentHistory: Array<{ code: string; description: string }> = [];
  let firstDefaultDate = "";
  let registrationDate = "";
  let lastUpdateDate = "";
  let maxDebtAmount = resumenCais.MaximoImporteImpagado || "";
  
  if (detalleOperacion) {
    creditor = detalleOperacion.Informante || "";
    product = detalleOperacion.TipoProductoFinanciado?.Descripcion || "";
    
    // Parse payment history
    const situacionPago = detalleOperacion.SituacionPago?.TTipoCodigo;
    if (Array.isArray(situacionPago)) {
      paymentHistory = situacionPago.map((item: any) => ({
        code: item.Codigo || "",
        description: item.Descripcion || ""
      }));
    }
    
    // Parse dates
    if (detalleOperacion.FechaPrimerVencimientoImpagado) {
      const fecha = detalleOperacion.FechaPrimerVencimientoImpagado;
      if (fecha.DD && fecha.MM && fecha.AAAA) {
        firstDefaultDate = `${fecha.DD}/${fecha.MM}/${fecha.AAAA}`;
      }
    }
    
    if (detalleOperacion.FechaAlta) {
      const fecha = detalleOperacion.FechaAlta;
      if (fecha.DD && fecha.MM && fecha.AAAA) {
        registrationDate = `${fecha.DD}/${fecha.MM}/${fecha.AAAA}`;
      }
    }
    
    if (detalleOperacion.FechaUltimaActualizacion) {
      const fecha = detalleOperacion.FechaUltimaActualizacion;
      if (fecha.DD && fecha.MM && fecha.AAAA) {
        lastUpdateDate = `${fecha.DD}/${fecha.MM}/${fecha.AAAA}`;
      }
    }
    
    if (detalleOperacion.MaximoImporteImpagado && !maxDebtAmount) {
      maxDebtAmount = detalleOperacion.MaximoImporteImpagado;
    }
  }
  
  const postalCode = direccion.CodigoPostal || "";
  
  return {
    defaultProbability: probability,
    historyStatus,
    currentDebt,
    unpaidInstallments,
    lastDefaultDate,
    isJudicial,
    hasDefaults,
    riskLevel,
    creditor,
    product,
    paymentHistory,
    firstDefaultDate,
    registrationDate,
    lastUpdateDate,
    maxDebtAmount,
    postalCode
  };
}
