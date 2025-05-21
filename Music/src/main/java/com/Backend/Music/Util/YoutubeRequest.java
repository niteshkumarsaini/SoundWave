package com.Backend.Music.Util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class YoutubeRequest {
	
	private String url;
	private String username;
	private String title;
	private String artist;
	
	

}
