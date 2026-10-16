package com.todo;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class TaskApiTest {

    @Autowired MockMvc mvc;

    private void create(String json) throws Exception {
        mvc.perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON).content(json))
           .andExpect(status().isCreated());
    }

    @Test
    void emptyTitleIsRejected() throws Exception {
        mvc.perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON).content("{\"title\":\"  \"}"))
           .andExpect(status().isBadRequest())
           .andExpect(jsonPath("$.errors.title").value("Title is required"));
    }

    @Test
    void fullCrudFlow() throws Exception {
        create("{\"title\":\"Write report\",\"priority\":\"HIGH\",\"deadline\":\"2020-01-01\"}");

        // defaults + overdue flag + search + filters
        mvc.perform(get("/api/tasks?search=report&status=OVERDUE"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$[0].status").value("PENDING"))
           .andExpect(jsonPath("$[0].overdue").value(true));

        mvc.perform(get("/api/tasks?status=COMPLETED&search=report"))
           .andExpect(jsonPath("$.length()").value(0));

        // update, mark completed, delete (id 1 because the table is fresh)
        mvc.perform(put("/api/tasks/1").contentType(MediaType.APPLICATION_JSON)
                .content("{\"title\":\"Write final report\",\"priority\":\"LOW\"}"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$.title").value("Write final report"));

        mvc.perform(patch("/api/tasks/1/status").contentType(MediaType.APPLICATION_JSON)
                .content("{\"status\":\"COMPLETED\"}"))
           .andExpect(jsonPath("$.status").value("COMPLETED"))
           .andExpect(jsonPath("$.overdue").value(false));

        mvc.perform(delete("/api/tasks/1")).andExpect(status().isNoContent());
        mvc.perform(get("/api/tasks/1")).andExpect(status().isNotFound());
    }
}
