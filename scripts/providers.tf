terraform {
  required_providers {
    azuread = {
      source  = "hashicorp/azuread"
      version = "2.12.0"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "2.88.1"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "3.1.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "2.7.1"
    }
  }
}

provider "azurerm" {
  features {}
}

provider "kubernetes" {
  host = azurerm_kubernetes_cluster.cluster.kube_config[0].host
  client_certificate = base64decode(azurerm_kubernetes_cluster.cluster.kube_config[0].client_certificate)
  client_key = base64decode(azurerm_kubernetes_cluster.cluster.kube_config[0].client_key)
  cluster_ca_certificate = base64decode(azurerm_kubernetes_cluster.cluster.kube_config[0].cluster_ca_certificate)
}
