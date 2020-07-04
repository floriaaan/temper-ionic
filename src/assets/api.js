export function retrieveProbe(probe) {
  fetch("http://localhost:8000/api/v1/probe/" + probe.state.id)
    .then((res) => res.json())
    .then(
      (result) => {
        probe.setState({
          id: result.response.data.id,
          name: result.response.data.name
            ? result.response.data.name
            : "Sonde #" + result.response.data.id,
          user: result.response.data.user,
          state: result.response.data.state,
          gps: {
            show: false,
            lon: result.response.data.gps.lon,
            lat: result.response.data.gps.lat,
          },
          category: result.response.data.category,
          lastmeasure: {
            temperature:
              Math.round(result.response.data.lastmeasure.temperature * 100) / 100,
            humidity:
              Math.round(result.response.data.lastmeasure.humidity * 100) / 100,
            date: result.response.data.lastmeasure.date,
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
  fetch("http://localhost:8000/api/v1/probe/user/" + list.props.user)
    .then((res) => res.json())
    .then(
      (result) => {
        list.setState({probes : result.response.data})
      },
      (error) => {
        console.error(error)
        list.setState({probes : []})
      }
    );
}

export function toggleState(probe) {
  fetch(
    "http://localhost:8000/api/v1/probe/" + probe.state.id + "/toggle",
    { method: "PUT" }
  )
    .then((res) => res.json())
    .then(
      (result) => {
        probe.setState({
          state: result.response.data.state,
        });
      },

      () => {
        retrieveProbe(probe);
      }
    );
}
