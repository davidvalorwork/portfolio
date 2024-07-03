import { VisEdge, VisNode } from "vis-network/declarations/network/gephiParser";

export interface IVisDataSet {
  nodes: VisNode[];
  edges: VisEdge[];
}