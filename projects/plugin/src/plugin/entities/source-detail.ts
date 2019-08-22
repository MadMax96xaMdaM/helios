import { TorrentSource } from './torrent-source';
import { DebridSource } from './debrid-source';

export interface SourceDetail {
  bestDebrid: DebridSource;
  debridSources: DebridSource[];
  bestTorrent: TorrentSource;
  torrentSources: TorrentSource[];
}
