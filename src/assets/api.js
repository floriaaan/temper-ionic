export function retrieveProbe(probe) {
  fetch("http://localhost:5000/temper/api/v1/probe/" + probe.state.id)
    .then((res) => res.json())
    .then(
      (result) => {
        probe.setState({
          id: result.response.id,
          name: result.response.name
            ? result.response.name
            : "Sonde #" + result.response.id,
          user: result.response.user,
          state: result.response.state,
          gps: {
            show: false,
            lon: result.response.gps.lon,
            lat: result.response.gps.lat,
          },
          lastmeasure: {
            temperature:
              Math.round(result.response.lastmeasure.temperature * 100) / 100,
            humidity:
              Math.round(result.response.lastmeasure.humidity * 100) / 100,
            date: result.response.lastmeasure.date,
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

export function retrieveUserProbes(list) {
  fetch("http://localhost:5000/temper/api/v1/probe/user/" + list.props.user)
    .then((res) => res.json())
    .then(
      (result) => {
        list.setState({probes : result.response})
      },
      (error) => {
        console.error(error)
        list.setState({probes : []})
      }
    );
}

export function toggleState(probe) {
  fetch(
    "http://localhost:5000/temper/api/v1/probe/" + probe.state.id + "/toggle",
    { method: "PUT" }
  )
    .then((res) => res.json())
    .then(
      (result) => {
        probe.setState({
          state: result.response.state,
        });
      },

      () => {
        retrieveProbe(probe);
      }
    );
}
