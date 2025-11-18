
/**
 * Recebe um valor de data/hora e retorna a data formatada como DD/MM/AAAA.
 *
 * @param datetimeValue O valor de data/hora (string, Date ou undefined).
 * @returns A string da data formatada (DD/MM/AAAA) ou string vazia se inválido.
 */

export function formatDate(date?: string): string {

    const data = date?.replaceAll('-', '/') || '';
    const partes = data.split('/');
    const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;

  return dataFormatada;

}

export const formatDateOnly = (datetimeValue: string | Date | undefined): string => {
  if (!datetimeValue) {
    return "";
  }

  let date: Date;

  if (typeof datetimeValue === 'string' && datetimeValue.includes('/')) {
    const match = datetimeValue.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    
    if (match) {
      const [, day, month, year] = match;
      date = new Date(`${month}/${day}/${year}`);
    } else {
      date = new Date(datetimeValue);
    }
  } else {
    date = new Date(datetimeValue);
  }

  if (isNaN(date.getTime())) {
    return ""; 
  }

  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return formatter.format(date);
};