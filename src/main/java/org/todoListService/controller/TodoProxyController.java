package org.todoListService.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 * Controller for proxying requests to the TODO API.
 */
@RestController
@RequestMapping("/api/todos")
public class TodoProxyController
{
    private static final String API_BASE_URL = "https://todo.doczilla.pro/api/todos";

    private final RestTemplate restTemplate;

    public TodoProxyController()
    {
        this.restTemplate = new RestTemplate();
    }

    /**
     * Proxy endpoint for fetching all tasks.
     *
     * @param limit  the limit of tasks to fetch
     * @param offset the offset for pagination
     * @return the list of tasks
     */
    @GetMapping
    public ResponseEntity<String> getAllTasks(@RequestParam(required = false) Integer limit,
                                              @RequestParam(required = false) Integer offset)
    {
        String url = API_BASE_URL;
        if (limit != null || offset != null)
        {
            url += "?";
            if (limit != null)
            {
                url += "limit=" + limit + "&";
            }
            if (offset != null)
            {
                url += "offset=" + offset;
            }
        }
        return restTemplate.getForEntity(url, String.class);
    }

    /**
     * Proxy endpoint for fetching tasks by date range.
     *
     * @param from   the start date
     * @param to     the end date
     * @param status the status filter
     * @param limit  the limit of tasks to fetch
     * @param offset the offset for pagination
     * @return the list of tasks
     */
    @GetMapping("/date")
    public ResponseEntity<String> getTasksByDateRange(@RequestParam long from,
                                                      @RequestParam long to,
                                                      @RequestParam(required = false) Boolean status,
                                                      @RequestParam(required = false) Integer limit,
                                                      @RequestParam(required = false) Integer offset)
    {
        StringBuilder urlBuilder = new StringBuilder(API_BASE_URL + "/date?from=" + from + "&to=" + to);
        if (status != null)
        {
            urlBuilder.append("&status=").append(status);
        }
        if (limit != null)
        {
            urlBuilder.append("&limit=").append(limit);
        }
        if (offset != null)
        {
            urlBuilder.append("&offset=").append(offset);
        }
        return restTemplate.getForEntity(urlBuilder.toString(), String.class);
    }

    /**
     * Proxy endpoint for fetching tasks by name.
     *
     * @param query  the query string
     * @param limit  the limit of tasks to fetch
     * @param offset the offset for pagination
     * @return the list of tasks
     */
    @GetMapping("/find")
    public ResponseEntity<String> getTasksByName(@RequestParam String query,
                                                 @RequestParam(required = false) Integer limit,
                                                 @RequestParam(required = false) Integer offset)
    {
        StringBuilder urlBuilder = new StringBuilder(API_BASE_URL + "/find?q=" + query);
        if (limit != null)
        {
            urlBuilder.append("&limit=").append(limit);
        }
        if (offset != null)
        {
            urlBuilder.append("&offset=").append(offset);
        }
        return restTemplate.getForEntity(urlBuilder.toString(), String.class);
    }
}
