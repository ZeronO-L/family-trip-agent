function add(actions, type, reason, priority) {
  if (!actions.some((action) => action.type === type)) {
    actions.push({ type, reason, priority });
  }
}

export function evaluateScenario(input) {
  const actions = [];

  if (input.replan?.trigger_present) {
    add(actions, "record_replan_trigger", "A replan must retain the event or new fact that invalidated the previous plan.", "P0");
  }

  if (input.replan?.trigger_present && input.replan?.old_plan_version_present) {
    add(actions, "create_new_plan_version", "Replanning must create a traceable version instead of overwriting the previous plan.", "P0");
  }

  if (input.replan?.trigger_present && input.replan?.booked_commitments_present) {
    add(actions, "preserve_booked_commitments", "Confirmed bookings remain immutable unless the user explicitly approves a replacement or cancellation.", "P0");
  }

  if (input.booking_state?.available_inventory_found && !input.booking_state?.user_confirmed_booking) {
    add(actions, "keep_available_inventory_as_selected", "Visible inventory is a candidate or selected option, not a confirmed reservation.", "P0");
    add(actions, "require_confirmation_before_booking", "Booking or payment requires explicit user confirmation and an external confirmation result.", "P0");
  }

  if (input.booking_state?.quoted_cost_present && !input.booking_state?.actual_expense_confirmed) {
    add(actions, "keep_quoted_cost_out_of_actuals", "A quoted or selected price is not an actual expense until the transaction is confirmed.", "P0");
  }

  if (input.attraction_change?.reservation_unavailable) {
    add(actions, "remove_unavailable_attraction", "An unavailable reservation cannot remain in the executable itinerary.", "P0");
  }

  if (input.attraction_change?.reservation_unavailable &&
      (input.attraction_change?.same_area_alternative_required || (input.attraction_change?.one_way_commute_minutes ?? 0) >= 45)) {
    add(actions, "prefer_low_commute_local_alternative", "Use a nearby optional activity or family rest instead of preserving a long detour to an unavailable anchor.", "P1");
  }

  if (input.attraction_change?.reservation_unavailable && input.attraction_change?.downstream_departure_time_present) {
    add(actions, "recalculate_downstream_departure", "Removing a timed anchor changes the next departure, travel buffer, and arrival estimate.", "P0");
  }

  if (input.accommodation?.same_property_consecutive_nights && input.accommodation?.separate_reservations) {
    if (!input.accommodation?.reservation_linked) {
      add(actions, "request_reservation_linking", "Ask the property to link consecutive reservations under one stay.", "P1");
    }
    if (!input.accommodation?.same_room_confirmed) {
      add(actions, "confirm_same_room_or_room_move", "The property must confirm whether checkout, a new key, luggage storage, or a room move is required.", "P1");
      add(actions, "keep_room_continuity_unresolved", "Matching room categories do not prove that the same physical room is assigned.", "P1");
    }
  }

  if (input.route_intensity?.single_driver &&
      input.route_intensity?.requested_pace === "relaxed" &&
      input.route_intensity?.all_constraints_can_be_satisfied === false) {
    add(actions, "disclose_constraint_conflict", "The requested pace conflicts with the calculated driving load and must be stated explicitly.", "P1");
    add(actions, "label_calculated_intensity", "Describe the plan using the calculated intensity rather than the requested label.", "P1");
    add(actions, "offer_scope_or_route_reduction", "Offer fewer stops, another night, or a different entry or exit pattern to restore a relaxed pace.", "P1");
  }

  if (input.weather?.temperature_c >= 33 && input.schedule?.midday_outdoor_activity) {
    add(actions, "add_rest_window", "High heat makes midday outdoor activity unsuitable for this family.", "P1");
    add(actions, "move_outdoor_after_17", "Move optional outdoor activity to a cooler period.", "P1");
  }

  if (input.weather?.heavy_rain && input.route?.mountain_or_riverside) {
    add(actions, "cancel_scenic_route", "Heavy rain on mountain or riverside roads triggers the safety exit plan.", "P0");
    add(actions, "use_fastest_safe_route", "Use the fastest safe official route and recheck closures.", "P0");
    add(actions, "verify_official_weather_and_road_alerts", "Refresh official route-level warnings before departure.", "P0");
  }

  if (input.route?.weak_dining_corridor && !input.meal?.verified_before_entry) {
    add(actions, "add_verified_meal_before_entry", "Do not enter a weak-dining corridor without an executable meal.", "P1");
    add(actions, "pack_complete_vehicle_meal", "Carry enough food to replace one full family meal.", "P1");
    add(actions, "set_lunch_decision_deadline", "Trigger the meal fallback before prolonged hungry driving.", "P1");
  }

  if (input.route?.scenic_waypoints && !input.route?.waypoint_order_verified) {
    add(actions, "verify_waypoint_order", "Map existence alone does not prove the driving order.", "P0");
    add(actions, "preserve_manual_waypoint_order", "Prevent navigation from automatically reordering scenic anchors.", "P0");
  }

  if (input.route?.source_versions_conflict) {
    add(actions, "reconcile_source_waypoints", "Text, image, and map waypoint lists must agree before the route is treated as executable.", "P0");
  }

  if ((input.route?.ambiguous_waypoints?.length ?? 0) > 0) {
    add(actions, "resolve_ambiguous_waypoints", "Areas and spoken place names must be resolved to exact route anchors.", "P0");
  }

  if (input.route?.backtracking_detected) {
    add(actions, "remove_backtracking_or_explain_constraint", "Avoidable backtracking should be removed unless a booked or family constraint requires it.", "P1");
  }

  if (input.route?.drive_times_realtime_verified === false) {
    add(actions, "treat_static_drive_times_as_unverified", "Static or undated drive times are planning estimates, not live navigation facts.", "P0");
  }

  if (input.route?.return_airport_confirmed === false) {
    add(actions, "resolve_return_airport", "The exact return airport and vehicle return location must be confirmed before locking the final day.", "P0");
  }

  if (input.route_research?.daily_drive_time_published && !input.route_research?.independent_map_checked) {
    add(actions, "cross_check_route_with_independent_map", "A published road-trip route needs an independent map or official road cross-check, not one source role alone.", "P1");
  }

  if (input.route_research?.daily_drive_time_published && !input.route_research?.all_planned_movements_counted) {
    add(actions, "recalculate_complete_daily_drive_time", "Daily driving must include hotel returns, evening outings, parking transfers, and other planned vehicle movements.", "P1");
  }

  if (input.venue?.reported_open && input.venue?.observed_status === "closed") {
    add(actions, "switch_to_ranked_backup", "The selected venue is closed; use a verified alternative.", "P0");
    add(actions, "record_source_conflict", "Preserve the platform-versus-on-site conflict for future verification.", "P1");
  }

  if ((input.departure?.delay_minutes ?? 0) > 0 && input.hard_constraint?.latest_arrival) {
    add(actions, "recalculate_eta_and_buffer", "A late departure changes the hard-arrival buffer.", "P0");
    add(actions, "remove_nonessential_stops", "Protect the hard arrival before preserving optional activities.", "P1");
  }

  if (["high", "severe"].includes(input.family_state?.fatigue)) {
    add(actions, "drop_optional_activities", "Family fatigue overrides itinerary completeness.", "P1");
    add(actions, "choose_nearby_meal_and_rest", "Prioritize food, rest, and safe arrival.", "P1");
  }

  if (input.parking?.listed_available && !input.parking?.action_card_complete) {
    add(actions, "require_parking_action_card", "A parking label does not describe entrance, unloading, lobby path, or fallback.", "P1");
  }

  if ((input.parking?.unknown_components?.length ?? 0) > 0) {
    add(actions, "list_parking_unknowns", "Unknown parking components must remain visible instead of being implied by a generic parking label.", "P1");
    add(actions, "add_direct_confirmation_or_arrival_fallback", "Unconfirmed parking operations need a direct-contact checklist or a safe arrival fallback.", "P1");
  }

  if (input.meal_research?.important_decision && (input.meal_research?.independent_review_sources ?? 0) < 2) {
    add(actions, "collect_two_independent_review_sources", "Official menus and opening hours do not establish food quality or family experience.", "P1");
  }

  if (input.meal_research?.important_decision && !input.meal_research?.negative_patterns_classified) {
    add(actions, "classify_negative_review_patterns", "Important meal recommendations need recent negative patterns grouped by operational cause.", "P1");
  }

  if (input.source_evidence?.sources_used && !input.source_evidence?.access_results_recorded) {
    add(actions, "record_source_access_results", "Each used source needs a full, partial, blocked, or manual-only access result.", "P1");
  }

  if (input.source_evidence?.sources_used && !input.source_evidence?.retrieval_times_recorded) {
    add(actions, "record_retrieval_times", "Volatile travel evidence needs a retrieval time in the destination timezone.", "P1");
  }

  if (input.source_evidence?.sources_used && !input.source_evidence?.fallbacks_or_unresolved_facts_recorded) {
    add(actions, "record_fallbacks_and_unresolved_facts", "Blocked sources and unresolved operational details require visible fallbacks and recheck actions.", "P1");
  }

  if ((input.attraction?.planned_hours ?? 0) >= 6 && input.attraction?.corridor_style) {
    add(actions, "offer_compact_and_full_versions", "Corridor attractions need a core short version and an optional full version.", "P1");
  }

  if (input.city_plan && !input.city_plan.spatial_clusters_verified) {
    add(actions, "cluster_city_stops_by_area", "Group city stops by geographic area before assigning them to days.", "P1");
  }

  if (input.city_plan?.outlier_stops_present) {
    add(actions, "move_outlier_stops_to_nearest_cluster_day", "Move outlier stops to the day with the closest geographic cluster.", "P1");
  }

  if (input.city_plan?.dynamic_entry_claims_present && !input.city_plan?.official_entry_sources_verified) {
    add(actions, "verify_dynamic_entry_rules_with_official_sources", "Time-sensitive entry, ticket, and event claims require current official verification.", "P0");
  }

  if (input.city_plan?.weather_dependent_day_trip && !input.city_plan?.weather_decision_gate_present) {
    add(actions, "add_weather_decision_gate", "A weather-dependent day trip needs a decision time, fallback, and exit condition.", "P1");
  }

  return actions;
}
