import ApiEndPoint  from "../../boot/axios";
import axios from 'axios'

const state = () => ({
    sterilisation_log_report_data:[],
    sterilisation_station_columns : [
        {
            align: "center",
            label: "sno",
            field: "index",
            headerClasses: "bg-indigo-10 text-white",
            headerStyle: {
              fontWeight: "bold"
            }
          },
          {
            name: "actions",
            label: "View ",
            field: "",
            headerClasses: "bg-indigo-10 text-white",
            align: "center",
            headerStyle: {
              fontWeight: "bold"
            }
          },
         
          // {
          //   align: "center",
          //   label: "Employee Name",
          //   field: "emp_name",
          //   headerClasses: "bg-indigo-10 text-white",
          //   headerStyle: {
          //     fontWeight: "bold"
          //   }
          //   // headerClasses: "text-bold "
          // },
          // {
          //   align: "plant_name",
          //   label: "Plant Name",
          //   field: "plant_name",
          //   headerClasses: "bg-indigo-10 text-white",
          //   headerStyle: {
          //     fontWeight: "bold"
          //   }
          //   // headerClasses: "text-bold "
          // },
          // {
          //   align: "center",
          //   label: "State",
          //   field: "state_name",
          //   headerClasses: "bg-indigo-10 text-white",
          //   headerStyle: {
          //     fontWeight: "bold"
          //   }
          // },
          {
            align: "center",
            label: "Batch No",
            field: "batch_no",
            headerClasses: "bg-indigo-10 text-white",
            headerStyle: {
              fontWeight: "bold"
            }
          },
          {
            name: "sterilizer_no",
            label: "Sterilizer No",
            field: "sterilizer_no",
            headerClasses: "bg-indigo-10 text-white",
            align: "center",
            headerStyle: {
              fontWeight: "bold"
            }
          },
          {
            name: "date",
            label: "Date ",
            field:"date",
            headerClasses: "bg-indigo-10 text-white",
            align: "center",
            headerStyle: {
              fontWeight: "bold"
            }
          },
          {
            align: "center",
            label: "1st Peak Time in",
            field: "peak_1st_time_in",
            headerClasses: "bg-indigo-10 text-white",
            headerStyle: {
              fontWeight: "bold"
            }
          },
          {
            name: "peak_1st_time_out",
            label: "1st Peak Time Out No",
            field: "peak_1st_time_out",
            headerClasses: "bg-indigo-10 text-white",
            align: "center",
            headerStyle: {
              fontWeight: "bold"
            }
          },
          {
            name: "peak_2nd_time_in",
            label: "2nd Peak Time in",
            field:"peak_2nd_time_in",
            headerClasses: "bg-indigo-10 text-white",
            align: "center",
            headerStyle: {
              fontWeight: "bold"
            }
          },

          {
            align: "center",
            label: "2nd Peak Time Out",
            field: "peak_2nd_time_out",
            headerClasses: "bg-indigo-10 text-white",
            headerStyle: {
              fontWeight: "bold"
            }
          },
          {
            name: "peak_3rd_time_in",
            label: "3rd Peak Time In",
            field: "peak_3rd_time_in",
            headerClasses: "bg-indigo-10 text-white",
            align: "center",
            headerStyle: {
              fontWeight: "bold"
            }
          },
          {
            name: "peak_3rd_40psi_time",
            label: "3rd Peak 40PSI Time ",
            field:"peak_3rd_40psi_time",
            headerClasses: "bg-indigo-10 text-white",
            align: "center",
            headerStyle: {
              fontWeight: "bold"
            }
          },

          {
            align: "center",
            label: "3rd Peak Time Out",
            field: "peak_3rd_time_out",
            headerClasses: "bg-indigo-10 text-white",
            headerStyle: {
              fontWeight: "bold"
            }
          },
          {
            name: "no_of_cages",
            label: "No Of Cages",
            field: "no_of_cages",
            headerClasses: "bg-indigo-10 text-white",
            align: "center",
            headerStyle: {
              fontWeight: "bold"
            }
          },
          {
            name: "remarks",
            label: "Remarks ",
            field:"remarks",
            headerClasses: "bg-indigo-10 text-white",
            align: "center",
            headerStyle: {
              fontWeight: "bold"
            }
          },        
        ],
turbine_log_report_data:[],
        turbine_log_columns : [
          {
              align: "center",
              label: "sno",
              field: "index",
              headerClasses: "bg-indigo-10 text-white",
              headerStyle: {
                fontWeight: "bold"
              }
            },
            {
              name: "actions",
              label: "View ",
              field: "",
              headerClasses: "bg-indigo-10 text-white",
              align: "center",
              headerStyle: {
                fontWeight: "bold"
              }
            },
           
            // {
            //   align: "center",
            //   label: "Employee Name",
            //   field: "emp_name",
            //   headerClasses: "bg-indigo-10 text-white",
            //   headerStyle: {
            //     fontWeight: "bold"
            //   }
            //   // headerClasses: "text-bold "
            // },
            // {
            //   align: "plant_name",
            //   label: "Plant Name",
            //   field: "plant_name",
            //   headerClasses: "bg-indigo-10 text-white",
            //   headerStyle: {
            //     fontWeight: "bold"
            //   }
            //   // headerClasses: "text-bold "
            // },
            // {
            //   align: "center",
            //   label: "State",
            //   field: "state_name",
            //   headerClasses: "bg-indigo-10 text-white",
            //   headerStyle: {
            //     fontWeight: "bold"
            //   }
            //   // headerClasses: "text-bold "
            // },
            {
              align: "center",
              label: "Shift",
              field: "shift",
              headerClasses: "bg-indigo-10 text-white",
              headerStyle: {
                fontWeight: "bold"
              }
              // headerClasses: "text-bold "
            },
            {
              name: "speed_rpm",
              label: "Speed (RPM)",
              field: "speed_rpm",
              headerClasses: "bg-indigo-10 text-white",
              align: "center",
              headerStyle: {
                fontWeight: "bold"
              }
            },
            {
              name: "load_kw",
              label: "Load (kw) ",
              field:"load_kw",
              headerClasses: "bg-indigo-10 text-white",
              align: "center",
              headerStyle: {
                fontWeight: "bold"
              }
            },
            {
              name: "date",
              label: "Date",
              field:"date",
              headerClasses: "bg-indigo-10 text-white",
              align: "center",
              headerStyle: {
                fontWeight: "bold"
              }
            },
              {
                name: "inlet_steam_temp",
                label: "Inlet Steam Temp",
                field:"inlet_steam_temp",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
                {
                  name: "inlet_steam_pre",
                  label: "Inlet Steam Pre",
                  field:"inlet_steam_pre",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                  {
                    name: "inlet_steam_flow",
                    label: "Inlet Steam Flow",
                    field:"inlet_steam_flow",
                    headerClasses: "bg-indigo-10 text-white",
                    align: "center",
                    headerStyle: {
                      fontWeight: "bold"
                    }
                    },
                    {
                      name: "lub_oil_pre",
                      label: "Lub Oil Pre",
                      field:"lub_oil_pre",
                      headerClasses: "bg-indigo-10 text-white",
                      align: "center",
                      headerStyle: {
                        fontWeight: "bold"
                      }
                      },
                      {
                        name: "control_oil_pre",
                        label: "Control Oil Pre",
                        field:"control_oil_pre",
                        headerClasses: "bg-indigo-10 text-white",
                        align: "center",
                        headerStyle: {
                          fontWeight: "bold"
                        }
                        },
                        {
                          name: "trip_oil_pre",
                          label: "Trip Oil Pre",
                          field:"trip_oil_pre",
                          headerClasses: "bg-indigo-10 text-white",
                          align: "center",
                          headerStyle: {
                            fontWeight: "bold"
                          }
                          },
                          {
                            name: "chust_pre",
                            label: "Chust Pre",
                            field:"chust_pre",
                            headerClasses: "bg-indigo-10 text-white",
                            align: "center",
                            headerStyle: {
                              fontWeight: "bold"
                            }
                            },
                            {
                              name: "exhaust_stem_pipe",
                              label: "Exhaust Stem Pipe",
                              field:"exhaust_stem_pipe",
                              headerClasses: "bg-indigo-10 text-white",
                              align: "center",
                              headerStyle: {
                                fontWeight: "bold"
                              }
                              },
                              {
                                name: "exhaust_stem_temp",
                                label: "Exhaust Stem Temp ",
                                field:"exhaust_stem_temp",
                                headerClasses: "bg-indigo-10 text-white",
                                align: "center",
                                headerStyle: {
                                  fontWeight: "bold"
                                }
                                },
                                {
                                  name: "gb_thrust_wear_pre",
                                  label: "GBBT thrust wear pre",
                                  field:"gb_thrust_wear_pre",
                                  headerClasses: "bg-indigo-10 text-white",
                                  align: "center",
                                  headerStyle: {
                                    fontWeight: "bold"
                                  }
                                  },
                                  {
                                    name: "gb_hp_casing_vibra",
                                    label: "GBBT HP Casing Vibra",
                                    field:"gb_hp_casing_vibra",
                                    headerClasses: "bg-indigo-10 text-white",
                                    align: "center",
                                    headerStyle: {
                                      fontWeight: "bold"
                                    },

            },
            {
              name: "gb_hp_degc",
              label: "GBBT HP degc",
              field:"gb_hp_degc",
              headerClasses: "bg-indigo-10 text-white",
              align: "center",
              headerStyle: {
                fontWeight: "bold"
              }
              },
              {
                name: "gb_lp_degc",
                label: "GBBT LP degc",
                field:"gb_lp_degc",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
                },
                {
                  name: "gb_pf_degc",
                  label: "GBBT PF degc",
                  field:"gb_pf_degc",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  },

},

{
  name: "gb_pa_degc",
  label: "GBBT PA degc",
  field:"gb_pa_degc",
  headerClasses: "bg-indigo-10 text-white",
  align: "center",
  headerStyle: {
    fontWeight: "bold"
  }
  },
  {
    name: "gb_gf_degc",
    label: "GBBT GF degc ",
    field:"gb_gf_degc",
    headerClasses: "bg-indigo-10 text-white",
    align: "center",
    headerStyle: {
      fontWeight: "bold"
    }
    },
    {
      name: "gb_gr_degc",
      label: "GBBT GR degc",
      field:"gb_gr_degc",
      headerClasses: "bg-indigo-10 text-white",
      align: "center",
      headerStyle: {
        fontWeight: "bold"
      },

},


{
  name: "gb_lube_oil_coller_before",
  label: "GBBT Lube Oil Coller Before ",
  field:"gb_lube_oil_coller_before",
  headerClasses: "bg-indigo-10 text-white",
  align: "center",
  headerStyle: {
    fontWeight: "bold"
  }
  },
  {
    name: "gb_lube_oil_coller_after",
    label: "GBBT Lube Oil Coller After",
    field:"gb_lube_oil_coller_after",
    headerClasses: "bg-indigo-10 text-white",
    align: "center",
    headerStyle: {
      fontWeight: "bold"
    }
    },
    {
      name: "gb_differ_pre",
      label: "GBBT Differ Pre ",
      field:"gb_differ_pre",
      headerClasses: "bg-indigo-10 text-white",
      align: "center",
      headerStyle: {
        fontWeight: "bold"
      },

},


{
  name: "gb_alt_de",
  label: "GBBT ALT DE ",
  field:"gb_alt_de",
  headerClasses: "bg-indigo-10 text-white",
  align: "center",
  headerStyle: {
    fontWeight: "bold"
  }
  },
  {
    name: "gb_alt_nde",
    label: "GBBT ALT NDE",
    field:"gb_alt_nde",
    headerClasses: "bg-indigo-10 text-white",
    align: "center",
    headerStyle: {
      fontWeight: "bold"
    }
    },
    {
      name: "water_pre",
      label: "Water Pre ",
      field:"water_pre",
      headerClasses: "bg-indigo-10 text-white",
      align: "center",
      headerStyle: {
        fontWeight: "bold"
      },

},


{
  name: "water_inlet_temp",
  label: "Water Inlet Temp",
  field:"water_inlet_temp",
  headerClasses: "bg-indigo-10 text-white",
  align: "center",
  headerStyle: {
    fontWeight: "bold"
  }
  },
  {
    name: "water_outlet_temp",
    label: "Water Outlet Temp ",
    field:"water_outlet_temp",
    headerClasses: "bg-indigo-10 text-white",
    align: "center",
    headerStyle: {
      fontWeight: "bold"
    }
    },
    {
      name: "remarks",
      label: "Remarks ",
      field:"remarks",
      headerClasses: "bg-indigo-10 text-white",
      align: "center",
      headerStyle: {
        fontWeight: "bold"
      },

}, 
          ],
          boiler_log_report_data:[],
          boiler_log_columns : [
            {
                align: "center",
                label: "sno",
                field: "index",
                headerClasses: "bg-indigo-10 text-white",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "actions",
                label: "View ",
                field: "",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
             
              // {
              //   align: "center",
              //   label: "Employee Name",
              //   field: "emp_name",
              //   headerClasses: "bg-indigo-10 text-white",
              //   headerStyle: {
              //     fontWeight: "bold"
              //   }
              //   // headerClasses: "text-bold "
              // },
              // {
              //   align: "plant_name",
              //   label: "Plant Name",
              //   field: "plant_name",
              //   headerClasses: "bg-indigo-10 text-white",
              //   headerStyle: {
              //     fontWeight: "bold"
              //   }
              //   // headerClasses: "text-bold "
              // },
              // {
              //   align: "center",
              //   label: "State",
              //   field: "state_name",
              //   headerClasses: "bg-indigo-10 text-white",
              //   headerStyle: {
              //     fontWeight: "bold"
              //   }
              //   // headerClasses: "text-bold "
              // },
              {
                align: "center",
                label: "Shift",
                field: "shift",
                headerClasses: "bg-indigo-10 text-white",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "date",
                label: "Date ",
                field:"date",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "time",
                label: "Time",
                field:"time",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "capacity",
                label: "Capacity ",
                field:"capacity",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
          

              {
                name: "working_pre",
                label: "Working Pre",
                field: "working_pre",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "boiler_feed_water_dis_pre",
                label: "Boiler Feed Water Dis Pre",
                field:"boiler_feed_water_dis_pre",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "boiler_feed_water_drum_level",
                label: "Boiler Feed Water Drum Level",
                field:"boiler_feed_water_drum_level",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
          

              {
                name: "main_steam_pre",
                label: "Main Steam Pre",
                field: "main_steam_pre",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "main_steam_temp",
                label: "Main Steam Temp",
                field:"main_steam_temp",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "fgt_furnance",
                label: "Flue Gas Temp Furnace ",
                field:"fgt_furnance",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
          


              {
                name: "fgt_bank_ol",
                label: "Flue Gas Temp Speed RPM (O/L)",
                field: "fgt_bank_ol",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "fgt_eco_ol",
                label: "Flue Gas Temp Eco (O/L)",
                field:"fgt_eco_ol",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "fgt_aph_ol",
                label: "Flue Gas Temp APH (O/L)",
                field:"fgt_aph_ol",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
          

              {
                name: "fgt_id_ol",
                label: "Flue Gas Temp ID (I/L)",
                field: "fgt_id_ol",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "atemperature_dsh_il",
                label: "Load (kw) ",
                field:"ATemperature DSH (I/L)",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "atemperature_dsh_ol",
                label: "At ",
                field:"ATemperature DSH (O/L)",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
          
              {
                name: "fwt_eco_il",
                label: "Feed Water Temp Eco (I/L)",
                field: "fwt_eco_il",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "fwt_eco_ol",
                label: "Feed Water Temp Eco (O/L)",
                field:"fwt_eco_ol",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "fuel_feeder_rpm_1",
                label: "Fuel Feeder-1RPM ",
                field:"fuel_feeder_rpm_1",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "fuel_feeder_rpm_2",
                label: "Fuel Feeder-2RPM",
                field: "fuel_feeder_rpm_2",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "fuel_feeder_rpm_3",
                label: "Fuel Feeder-3RPM",
                field:"fuel_feeder_rpm_3",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "fuel_feeder_rpm_4",
                label: "Fuel Feeder-4RPM",
                field:"fuel_feeder_rpm_4",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },

              {
                name: "fgd_fur",
                label: "Fuel Gas Draught Fur",
                field: "fgd_fur",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "fgd_eco",
                label: "Fuel Gas Draught Eco(I/L)",
                field:"fgd_eco",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "fgd_aph",
                label: "Fuel Gas Draught APH (I/L)",
                field:"fgd_aph",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },

              {
                name: "fgd_id",
                label: "Fuel Gas Draught ID (I/L)",
                field: "fgd_id",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "apd_fd",
                label: "APD FD",
                field:"apd_fd",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "apd_sa",
                label: "APD SA",
                field:"apd_sa",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },

              {
                name: "apd_aph",
                label: "APD APH (O/L) Air",
                field: "apd_aph",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "apd_level",
                label: "APD Level",
                field:"apd_level",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "apd_pre",
                label: "APD Pre",
                field:"apd_pre",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },

              {
                name: "feed_water_flow_tph",
                label: "Feed Water Flow (TPH)",
                field: "feed_water_flow_tph",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "steam_flow_tph",
                label: "Steam Flow (TPH)",
                field:"steam_flow_tph",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "feed_water_totalizer",
                label: "Feed Water Totalizer",
                field:"feed_water_totalizer",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },

              {
                name: "steam_totalizer",
                label: "Steam Totalizer",
                field: "steam_totalizer",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "turbine_load",
                label: "Turbine Load",
                field:"turbine_load",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "id_fan_rpm",
                label: "ID Fan RPM",
                field:"id_fan_rpm",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "id_fan_amps",
                label: "ID Fan Amps",
                field: "id_fan_amps",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },
              {
                name: "remarks",
                label: "Remarks",
                field:"remarks",
                headerClasses: "bg-indigo-10 text-white",
                align: "center",
                headerStyle: {
                  fontWeight: "bold"
                }
              },  
            ],
            shift_log_report_data:[],
            shift_log_columns : [
              {
                  align: "center",
                  label: "sno",
                  field: "index",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "actions",
                  label: "View",
                  field: "",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
               
                // {
                //   align: "center",
                //   label: "Employee Name",
                //   field: "emp_name",
                //   headerClasses: "bg-indigo-10 text-white",
                //   headerStyle: {
                //     fontWeight: "bold"
                //   }
                //   // headerClasses: "text-bold "
                // },
                // {
                //   align: "plant_name",
                //   label: "Plant Name",
                //   field: "plant_name",
                //   headerClasses: "bg-indigo-10 text-white",
                //   headerStyle: {
                //     fontWeight: "bold"
                //   }
                //   // headerClasses: "text-bold "
                // },
                // {
                //   align: "center",
                //   label: "State",
                //   field: "state_name",
                //   headerClasses: "bg-indigo-10 text-white",
                //   headerStyle: {
                //     fontWeight: "bold"
                //   }
                // },
                {
                  align: "center",
                  label: "Shift",
                  field: "shift",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "unit",
                  label: "Unit",
                  field: "unit",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "no_of_batches_sterilized",
                  label: "No of Batches Sterilized",
                  field:"no_of_batches_sterilized",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "date",
                  label: "Date ",
                  field:"date",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "No of Cages Processed",
                  field: "no_of_cages_processed",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "Press Running Hrs Press1",
                  field: "press_running_hrs_press1",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "press_running_hrs_press2",
                  label: "Press Running Hrs Press2",
                  field: "press_running_hrs_press2",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "press_running_hrs_press3",
                  label: "Press Running Hrs Press3",
                  field:"press_running_hrs_press3",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "press_running_hrs_press4",
                  label: "Press Running Hrs Press4",
                  field:"press_running_hrs_press4",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
            

                {
                  align: "center",
                  label: "Press Running Total Hrs",
                  field: "press_running_total_hrs",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "EFB shd1",
                  field: "efb_shd1",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "efb_shd2",
                  label: "EFB shd2",
                  field: "efb_shd2",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "efb_shd3",
                  label: "EFB shd3",
                  field:"efb_shd3",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "efb_shd4",
                  label: "EFB Shd 4 ",
                  field:"efb_shd4",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
            

                {
                  align: "center",
                  label: "EFB shd Total Hrs",
                  field: "efb_shd_total_hrs",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "EFB Prs1",
                  field: "efb_prs1",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "efb_prs2",
                  label: "EFB Prs2",
                  field: "efb_prs2",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "efb_prs3",
                  label: "EFB Prs3",
                  field:"efb_prs3",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "efb_prs4",
                  label: "EFB Prs4 ",
                  field:"efb_prs4",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
            

                {
                  align: "center",
                  label: "EFB prs Total Hrs",
                  field: "efb_prs_total_hrs",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "Decanter 1",
                  field: "decanter1",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "decanter2",
                  label: "Decanter 2",
                  field: "decanter2",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "decanter3",
                  label: "Decanter 3",
                  field:"decanter3",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "total_hrs_decanter",
                  label: "Total Hrs Decanter",
                  field:"total_hrs_decanter",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
            
                {
                  align: "center",
                  label: "Nozzle Centrifuge 1",
                  field: "nozzle_centrifuge_1",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "Nozzle Centrifuge 2",
                  field: "nozzle_centrifuge_2",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "nozzle_centrifuge_3",
                  label: "Nozzle Centrifuge 3",
                  field: "nozzle_centrifuge_3",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "cpo_flow_meter_total_qty",
                  label: "cpo Flow Meter Total Qty",
                  field:"cpo_flow_meter_total_qty",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "cpo_flow_meter_wel_oil",
                  label: "cpo Flow Meter Wel Oil ",
                  field:"cpo_flow_meter_wel_oil",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
            
                {
                  align: "center",
                  label: "CPO Flow Meter Sludge",
                  field: "cpo_flow_meter_sludge",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "CPO Flow Meter oer",
                  field: "cpo_flow_meter_oer",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "kernel_hrs_silo1",
                  label: "Speed RPM",
                  field: "Kernel Hrs Silo1",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "kernel_hrs_silo2",
                  label: "Load (kw) ",
                  field:"Kernel Hrs Silo2",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "kernel_hrs_silo3",
                  label: "Kernel Hrs Silo3 ",
                  field:"kernel_hrs_silo3",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
            
                {
                  align: "center",
                  label: "ESRH A1",
                  field: "esrh_a1",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "ESRH A2",
                  field: "esrh_a2",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "esrh_a3",
                  label: "ESRH A3",
                  field: "esrh_a3",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "esrh_a4",
                  label: "ESRH A4",
                  field:"esrh_a4",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "esrh_a5",
                  label: "ESRH A5 ",
                  field:"esrh_a5",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
            
                {
                  align: "center",
                  label: "ESRH A6",
                  field: "esrh_a6",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "Total ESRH a Epellers",
                  field: "total_esrh_a_epellers",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "esrh_b1",
                  label: "ESRH B1",
                  field: "esrh_b1",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "esrh_b2",
                  label: "ESRH B2",
                  field:"esrh_b2",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "esrh_b3",
                  label: "ESRH B3 ",
                  field:"esrh_b3",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "ESRH B4",
                  field: "esrh_b4",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "ESRH B5",
                  field: "esrh_b5",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "ESRH B6",
                  field: "esrh_b6",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "total_hrs_b_epellers",
                  label: "Total Hrs B Epecllers",
                  field:"total_hrs_b_epellers",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "cpko_opening",
                  label: "CPKO Opening ",
                  field:"cpko_opening",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },

                {
                  name: "cpko_total_qty",
                  label: "CPKO Total Qty",
                  field:"cpko_total_qty",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "cpko_oer",
                  label: "CPKO oer ",
                  field:"cpko_oer",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "CPKO Doc Bags Filling",
                  field: "cpko_doc_bags_filling",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "CPKO Doc Stock",
                  field: "cpko_doc_stock",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "esrh_b6",
                  label: "CPKO Doc Stock",
                  field: "cpko_dispatches",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "ffb_ramp",
                  label: "FFB Ramp",
                  field:"ffb_ramp",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "ffb_cages",
                  label: "FFB Cages ",
                  field:"ffb_cages",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "ster_ffb",
                  label: "FFB Ster",
                  field:"ster_ffb",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "stenlizer1",
                  label: "Stenlizer 1 ",
                  field:"stenlizer1",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "Stenlizer 2",
                  field: "stenlizer2",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "Stenlzer 3",
                  field: "stenlizer3",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "pending_vehicles",
                  label: "Pending Vehicles",
                  field: "pending_vehicles",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "shift_unloading_qty",
                  label: "Shift Unloading Qty",
                  field:"shift_unloading_qty",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "weak_total_ffb",
                  label: "Weak Total FFB ",
                  field:"weak_total_ffb",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },

                {
                  name: "boiler_running_hrs",
                  label: "Boiler Running Hrs",
                  field:"boiler_running_hrs",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "Feed Water Cone",
                  field: "feed_water_cans",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  align: "center",
                  label: "Steam Cone",
                  field: "steam_cone",
                  headerClasses: "bg-indigo-10 text-white",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "feed_water_stock",
                  label: "Feed Water Stock",
                  field: "feed_water_stock",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "tg_running_hrs",
                  label: "TG running hrs",
                  field:"tg_running_hrs",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
                {
                  name: "remarks",
                  label: "Remarks",
                  field:"remarks",
                  headerClasses: "bg-indigo-10 text-white",
                  align: "center",
                  headerStyle: {
                    fontWeight: "bold"
                  }
                },
              ],
  

       
});
const mutations  = {
    SET_STERILISATION_LOG_REPORT_DATA(state,rows){
        state.sterilisation_log_report_data=rows
    },
    SET_Turbine_LOG_REPORT_DATA(state,rows){
      state.turbine_log_report_data=rows
  },
  SET_BOILER_LOG_REPORT_DATA(state,rows){
    state.boiler_log_report_data=rows
},
SET_SHIFT_LOG_REPORT_DATA(state,rows){
  state.shift_log_report_data=rows
},
CLEAR_STERILISATION_LOG_REPORT_DATA(state) {
  state.sterilisation_log_report_data = [];
},
CLEAR_TURBINE_LOG_REPORT_DATA(state) {
  state.turbine_log_report_data = [];
},
CLEAR_BOILER_LOG_REPORT_DATA(state) {
  state.boiler_log_report_data = [];
},
CLEAR_SHIFT_LOG_REPORT_DATA(state) {
  state.shift_log_report_data = [];
}

};
const actions = {


  loadReportWiseSterilizationLogData({ commit, dispatch }, payload) {
    dispatch("alerts_loaders/startLoading", "", { root: true });
  
    setTimeout(async () => {
      dispatch("alerts_loaders/stopLoading", "", { root: true });

            const queryParams = new URLSearchParams(payload).toString();
  
      try {
        const response = await fetch(
          `https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/sterilizationStationLogReport.php?${queryParams}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }

        );
  
        if (response.ok) {
          const rows = await response.json();
          commit("SET_STERILISATION_LOG_REPORT_DATA", rows);
        } else {
          throw new Error("Failed to Sterilisastion Log Report data");
        }
      } catch (error) {
        dispatch(
          "alerts_loaders/showAlert",
          {
            msg: "Error While Loading Data",
            type: "negative",
          },
          { root: true }
        );
      }
    }, 1500);
  },
  


  async loadReportWiseTurbineLogData({ commit, dispatch }, payload) {
    dispatch("alerts_loaders/startLoading", "", { root: true });
    const queryParams= new URLSearchParams(payload).toString()

    setTimeout(async() => {
      dispatch("alerts_loaders/stopLoading", "", { root: true });
     try {
          const response = await fetch(
            `https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/turbineLogReport.php?${queryParams}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          if (response.ok) {
            const rows = await response.json();
            commit("SET_Turbine_LOG_REPORT_DATA", rows);
          } else {
            throw new Error("Failed to Turbine Log Report data");
          }
        } 
        catch(error) {
          dispatch(
            "alerts_loaders/showAlert",
            {
              msg: "Error While Loading Data",
              type: "negative"
            },
            { root: true }
          );
        };
    }, 1500);
  },

  async loadReportWiseBoilerLogData({ commit, dispatch }, payload) {
    dispatch("alerts_loaders/startLoading", "", { root: true });

    const queryParams= new URLSearchParams(payload).toString()

    setTimeout(async() => {
      dispatch("alerts_loaders/stopLoading", "", { root: true });
      try {
        const response = await fetch(
          `https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/boilerLogReport.php?${queryParams}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.ok) {
          const rows = await response.json();
          commit("SET_BOILER_LOG_REPORT_DATA", rows);
        } else {
          throw new Error("Failed to Boiler Log Report Data");
        }
      } 
        catch(error){
          dispatch(
            "alerts_loaders/showAlert",
            {
              msg: "Error While Loading Data",
              type: "negative"
            },
            { root: true }
          );
        };
    }, 1500);
  },

  loadReportWiseShiftLogData({ commit, dispatch }, payload) {
    dispatch("alerts_loaders/startLoading", "", { root: true });

    const queryParams= new URLSearchParams(payload).toString()
    setTimeout(async()=> {
      dispatch("alerts_loaders/stopLoading", "", { root: true });
      try {
        const response = await fetch(
          `https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/shiftLogReport.php?${queryParams}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("1803",response)
  
        if (response.ok) {
          const rows = await response.json();
          // console.log("1811",rows)
          commit("SET_SHIFT_LOG_REPORT_DATA", rows);
        } else {
          throw new Error("Failed to Boiler Log Report Data");
        }
      } 
        catch(error) {
          dispatch(
            "alerts_loaders/showAlert",
            {
              msg: "Error While Loading Data",
              type: "negative"
            },
            { root: true }
          );
        };
    }, 1500);
  },
  

async updateSterilisationStationLog({ commit, dispatch }, payload) {
  console.log("1917",payload)

console.log("serverdatae",payload.server_datetime)
  let user=JSON.parse(localStorage.getItem('userDetails'))
  console.log("user",user)
  dispatch("alerts_loaders/startLoading", "", { root: true });

  try {
    const response = await fetch(
      "https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/sterilizationStationLogUpdatePutM.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    
    
    const result = await response.json();
    // console.log("1998",result)

    if (result.IsDataUploaded == true) {
      dispatch(
        "alerts_loaders/showAlert",
        { msg:"Sterilisation Details Updated successful!", type: "positive" },
        { root: true }
      );
    } else {
      dispatch(
        "alerts_loaders/showAlert",
        { msg: "Update failed!", type: "negative" },
        { root: true }
      );
    }
    
  } catch (error) {
    dispatch(
      "alerts_loaders/showAlert",
      {
        msg: "Error While Loading Data",
        type: "negative",
      },
      { root: true }
    );
  } finally {
    dispatch("alerts_loaders/stopLoading", "", { root: true });
  }
},


  updateTurbineLog({ commit, dispatch }, payload) {

    dispatch("alerts_loaders/startLoading", "", { root: true });
    setTimeout(async() => {
      dispatch("alerts_loaders/stopLoading", "", { root: true });
      try{
        const response= await fetch ("https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/turbineLogUpdatePutM.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
          // console.log("response",response)
          const result= await response.json()
          // console.log("result",result)
          if (result.IsDataUploaded == true) {
            dispatch(
              "alerts_loaders/showAlert",
              { msg:  "Successfully updated the turbine log details", type: "positive" },
              { root: true }
            );
          } else {
            dispatch(
              "alerts_loaders/showAlert",
              { msg: "Error in updating the turbine log details", type: "negative" },
              { root: true }
            );
          }
        
        }
        catch(error) {
          dispatch(
            "alerts_loaders/showAlert",
            {
              msg: "Error While Loading Data",
              type: "negative"
            },
            { root: true }
          );
        }
    }, 1500);
  },

  updateBoilerLog({ commit, dispatch }, payload) {
    dispatch("alerts_loaders/startLoading", "", { root: true });
    setTimeout(async() => {
      dispatch("alerts_loaders/stopLoading", "", { root: true });
try{
        const response= await fetch("https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/boilerLogUpdatePutM.php",

        {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(payload),
        })
        const result= await response.json()
        if (result.IsDataUploaded == true) {
            dispatch(
              "alerts_loaders/showAlert",
              { msg: "Successfully Updated the Boiler Log Details", type: "positive" },
              { root: true }
            );
          } else {
            dispatch(
              "alerts_loaders/showAlert",
              { msg: "Error in updating boiler log details", type: "negative" },
              { root: true }
            );
          }
    }
        catch (error) {
          dispatch(
            "alerts_loaders/showAlert",
            {
              msg: "Error While Loading Data",
              type: "negative"
            },
            { root: true }
          );
        }
    }, 1500);
  },

  updateShiftLog({ commit, dispatch }, payload) {
    dispatch("alerts_loaders/startLoading", "", { root: true });
    setTimeout(async() => {
      dispatch("alerts_loaders/stopLoading", "", { root: true });
    
      try{
      const response= await fetch("https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/shiftLogUpdatePutM.php",

        {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(payload),
        })

    
        const result= await response.json()
        if (result.IsDataUploaded == true) {
            dispatch(
              "alerts_loaders/showAlert",
              { msg:"Shift Log Details Successfully Updated " , type: "positive" },
              { root: true }
            );
          } else {
            dispatch(
              "alerts_loaders/showAlert",
              { msg:"Error in Updating Shift Log Details", type: "negative" },
              { root: true }
            );
          }
        
        }
        catch(error) {
          dispatch(
            "alerts_loaders/showAlert",
            {
              msg: "Error While Loading Data",
              type: "negative"
            },
            { root: true }
          );
        };
    }, 1500);
  },

  initDB(storeName) {
    const request = indexedDB.open("millOperationsFormDataDB", 2);
  
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create the object store if it doesn't already exist
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
  
    request.onsuccess = (event) => {
      this.db = event.target.result;
    };
  
    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.error);
    };
  },
  updateUserPassword({commit,dispatch},payload){
    axios
    .put(`${ApiEndPoint}/reports/changeUserPassword`, payload)  
  
    .then(response=>{

      if (response.statusText == "OK") {
        dispatch(
          "alerts_loaders/showAlert",
          { msg: response.data.message, type: "positive" },
          { root: true }
        );
      } else {
        dispatch(
          "alerts_loaders/showAlert",
          { msg: response.data.message, type: "negative" },
          { root: true }
        );
      }

    })
    .catch(error=>{


      dispatch(
        "alerts_loaders/showAlert",
        {
          msg: "Error While Loading Data",
          type: "negative"
        },
        { root: true }
      );
      console.log("error")
    })
  }
};

const getters  = {
    sterilisation_log_report_data:(state)=> state.sterilisation_log_report_data,
    turbine_log_report_data:(state)=> state.turbine_log_report_data,
    boiler_log_report_data:(state)=> state.boiler_log_report_data,
    shift_log_report_data:(state)=> state.shift_log_report_data,

   
};
export const reports = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};