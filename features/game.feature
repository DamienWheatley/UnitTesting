Feature: Run a table tennis league

  Scenario: empty league
    Given the league has no players
    When I print the league
    Then I should see that there are no players
