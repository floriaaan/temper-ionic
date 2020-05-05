export function retrieveProbe(probe) {
  fetch("https://floriaaan.alwaysdata.net/atmos/measure/last/1")
    .then((res) => res.json())
    .then(
      (result) => {
        probe.setState({
            id: result.id,
            lastmeasure: {
                temp: Math.round(result.temp*100)/100,
                humid: Math.round(result.humidite*100)/100
            },
            loading: false,
        });
      },
      // Remarque : il est important de traiter les erreurs ici
      // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
      // des exceptions provenant de réels bugs du composant.
      (error) => {
        return {
          data: null,
          loading: true,
          error: error,
        };
      }
    );
}
