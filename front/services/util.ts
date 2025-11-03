


export function formatDate(date?: string): string {

    const data = date?.replaceAll('-', '/') || '';
    const partes = data.split('/');
    const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;

  return dataFormatada;

}
