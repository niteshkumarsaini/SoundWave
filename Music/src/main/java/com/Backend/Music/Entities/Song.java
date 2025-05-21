package com.Backend.Music.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String title;
    private String artist;
    private String songPath;
    private String thumnailPath;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference("user-song")
    private User user;

    @ManyToOne
    @JoinColumn(name = "playlist_id")
    @JsonBackReference("playlist-song")
    private Playlist playlist;
}
