import React from "react";
import {
  Box,
  Skeleton,
  Heading,
  Text,
  Stack,
  Badge,
  Button,
  Collapse,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/core";
import { FaTemperatureLow, FaUmbrella, FaClock } from "react-icons/fa";
import moment from "moment";
//import 'moment/locale/fr';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { retrieveProbe, toggleState } from "../../assets/api.js";
import "./Probe.scss";

export class Probe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      state: false,
      lastmeasure: {},
      gps: {
        show: true,
      },
      loading: true,
    };
  }
  componentDidMount() {
    retrieveProbe(this);
  }

  handleToggleLocation() {
    let lon = this.state.gps.lon;
    let lat = this.state.gps.lat;
    this.setState({
      gps: {
        lon: lon,
        lat: lat,
        show: !this.state.gps.show,
      },
    });
  }

  render() {
    return (
      <Box borderWidth="1px" rounded="lg" mt={3} p={4}>
        <Skeleton isLoaded={!this.state.loading}>
          <Heading>{this.state.name}</Heading>
        </Skeleton>
        <Skeleton isLoaded={!this.state.loading} mt="3px" ml="20px">
          <Stack isInline>
            <Badge variantColor={this.state.state ? "green" : "red"}>
              {this.state.state ? "Active" : "Disabled"}
            </Badge>
          </Stack>
        </Skeleton>
        <Skeleton isLoaded={!this.state.loading} mt="15px">
          <List spacing={3}>
            {this.state.lastmeasure.temperature !== 0 ? (
              <ListItem>
                <ListIcon icon={FaTemperatureLow} color="teal.300" />
                {this.state.lastmeasure.temperature + "°C"}
              </ListItem>
            ) : (
              <ListItem>
                <ListIcon icon={FaTemperatureLow} color="red.500" />❌
              </ListItem>
            )}
            {this.state.lastmeasure.humidity !== 0 ? (
              <ListItem>
                <ListIcon icon={FaUmbrella} color="teal.500" />
                {this.state.lastmeasure.humidity + "%"}
              </ListItem>
            ) : (
              <ListItem>
                <ListIcon icon={FaUmbrella} color="red.500" />❌
              </ListItem>
            )}
            {this.state.lastmeasure.date !== "None" ? (
              <ListItem>
                <ListIcon icon={FaClock} color="teal.700" />
                {moment(this.state.lastmeasure.date).fromNow()}
              </ListItem>
            ) : (
              <ListItem>
                <ListIcon icon={FaClock} color="red.500" />❌
              </ListItem>
            )}
          </List>
        </Skeleton>

        <Skeleton isLoaded={!this.state.loading} mt="15px">
          <Button
            leftIcon="drag-handle"
            variantColor={this.state.state ? "red" : "green"}
            variant="ghost"
            onClick={() => toggleState(this)}
          >
            Toggle {this.state.name}
          </Button>
        </Skeleton>

        <Skeleton isLoaded={!this.state.loading} mt={3}>
          <Button
            leftIcon={this.state.gps.show ? "triangle-up" : "triangle-down"}
            variantColor="blue"
            variant="ghost"
            onClick={() => this.handleToggleLocation()}
          >
            Location
          </Button>
        </Skeleton>
        <Collapse mt={4} isOpen={this.state.gps.show}>
          <Skeleton isLoaded={!this.state.loading} mt="7px">
            {this.state.gps.lon && this.state.gps.lat ? (
              <Map center={[this.state.gps.lat, this.state.gps.lon]} zoom="15">
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[this.state.gps.lat, this.state.gps.lon]}>
                  <Popup>
                    <Button
                      variantColor={this.state.state ? "red" : "green"}
                      variant="ghost"
                      onClick={() => toggleState(this)}
                    >
                      {this.state.state ? 'Turn off' : 'Turn on'}
                    </Button>
                  </Popup>
                </Marker>
              </Map>
            ) : (
              <Text fontSize="xs">
                No location{" "}
                <span role="img" aria-label="No location">
                  ❌
                </span>
              </Text>
            )}
          </Skeleton>
        </Collapse>
      </Box>
    );
  }
}
